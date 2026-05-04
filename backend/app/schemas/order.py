from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = 1


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    delivery_address: str
    delivery_latitude: Optional[float] = None
    delivery_longitude: Optional[float] = None
    comment: Optional[str] = None


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: float
    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    status: str
    delivery_address: str
    total_price: float
    delivery_price: float
    created_at: datetime
    items: List[OrderItemResponse]
    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: str
