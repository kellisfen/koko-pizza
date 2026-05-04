from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


class CategoryType(str, enum.Enum):
    PIZZA = "pizza"
    DRINK = "drink"
    SNACK = "snack"
    DESSERT = "dessert"


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image_url = Column(String(500))
    category = Column(SQLEnum(CategoryType), nullable=False)
    is_available = Column(Boolean, default=True)
    weight = Column(String(50))  # "500г", "30см"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Для пиццы — состав
    ingredients = Column(Text)  # "томаты, сыр, грибы..."


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, default=1)
    unit_price = Column(Float, nullable=False)  # Цена на момент заказа
    product_name = Column(String(255))  # Название на момент заказа
