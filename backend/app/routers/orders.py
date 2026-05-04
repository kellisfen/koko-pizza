from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User, UserRole
from app.models.menu import Product, OrderItem
from app.models.order import Order, OrderStatus
from app.schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate

router = APIRouter()


def calculate_delivery(distance_km: float) -> float:
    """Расчёт стоимости доставки"""
    base = 50  # минимальная стоимость
    per_km = 20
    return min(base + distance_km * per_km, 300)  # макс 300


@router.get("/", response_model=List[OrderResponse])
def get_orders(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role == UserRole.ADMIN:
        orders = db.query(Order).all()
    elif current_user.role == UserRole.COURIER:
        orders = db.query(Order).filter(Order.courier_id == current_user.id).all()
    else:
        orders = db.query(Order).filter(Order.client_id == current_user.id).all()
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Проверка доступа
    if current_user.role == UserRole.CLIENT and order.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return order


@router.post("/", response_model=OrderResponse)
def create_order(order_data: OrderCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Считаем товары
    total_price = 0
    order_items = []
    
    for item_data in order_data.items:
        product = db.query(Product).filter(Product.id == item_data.product_id).first()
        if not product or not product.is_available:
            raise HTTPException(status_code=400, detail=f"Product {item_data.product_id} not available")
        
        item_total = product.price * item_data.quantity
        total_price += item_total
        
        order_items.append({
            "product_id": product.id,
            "product_name": product.name,
            "quantity": item_data.quantity,
            "unit_price": product.price,
        })
    
    # Расчёт доставки (упрощённо)
    delivery_price = 0
    if order_data.delivery_latitude and order_data.delivery_longitude:
        # Можно использовать формулу Haversine для реального расстояния
        # Пока упрощённо
        delivery_price = 100  # фиксированная доставка
    
    # Создаём заказ
    order = Order(
        client_id=current_user.id,
        delivery_address=order_data.delivery_address,
        delivery_latitude=order_data.delivery_latitude,
        delivery_longitude=order_data.delivery_longitude,
        total_price=total_price + delivery_price,
        delivery_price=delivery_price,
        comment=order_data.comment,
        status=OrderStatus.PENDING,
    )
    db.add(order)
    db.flush()
    
    # Добавляем товары
    for item_data in order_items:
        order_item = OrderItem(order_id=order.id, **item_data)
        db.add(order_item)
    
    db.commit()
    db.refresh(order)
    return order


@router.put("/{order_id}/status")
def update_order_status(order_id: int, status_data: OrderStatusUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Проверка прав
    if current_user.role not in [UserRole.ADMIN, UserRole.COURIER]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Обновление статуса
    order.status = OrderStatus(status_data.status)
    
    if status_data.status == "delivered":
        order.delivered_at = datetime.utcnow()
    
    if status_data.status == "delivering" and current_user.role == UserRole.COURIER:
        order.courier_id = current_user.id
    
    db.commit()
    return {"message": "Status updated"}


@router.put("/{order_id}/assign-courier")
def assign_courier(order_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = OrderStatus.READY
    db.commit()
    return {"message": "Courier assigned"}
