from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum as SQLEnum, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


class OrderStatus(str, enum.Enum):
    PENDING = "pending"           # Ожидает подтверждения
    CONFIRMED = "confirmed"       # Подтверждён
    COOKING = "cooking"           # Готовится
    READY = "ready"               # Готов к выдаче курьеру
    DELIVERING = "delivering"     # В пути
    DELIVERED = "delivered"       # Доставлен
    CANCELLED = "cancelled"       # Отменён


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    courier_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.PENDING)
    
    # Адрес доставки
    delivery_address = Column(String(500), nullable=False)
    delivery_latitude = Column(Float, nullable=True)
    delivery_longitude = Column(Float, nullable=True)
    
    # Геолокация пиццерии (для расчёта расстояния)
    store_latitude = Column(Float, default=59.9311)   # Владивосток
    store_longitude = Column(Float, default=30.3609)
    
    # Итого
    total_price = Column(Float, nullable=False)
    delivery_price = Column(Float, default=0)
    
    # Время
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    delivered_at = Column(DateTime(timezone=True), nullable=True)
    
    # Комментарий
    comment = Column(Text, nullable=True)
    
    # Связи
    client = relationship("User", foreign_keys=[client_id], back_populates="client_orders")
    courier = relationship("User", foreign_keys=[courier_id], back_populates="courier_orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


# Отношения обратные
from app.models.user import User
User.client_orders = relationship("Order", foreign_keys=[Order.client_id], back_populates="client")
User.courier_orders = relationship("Order", foreign_keys=[Order.courier_id], back_populates="courier")

# Отношение для OrderItem
from app.models.menu import OrderItem
OrderItem.order = relationship("Order", back_populates="items")
