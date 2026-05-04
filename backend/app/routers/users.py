from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.auth import UserResponse

router = APIRouter()


@router.get("/profile", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/profile", response_model=UserResponse)
def update_profile(full_name: str = None, phone: str = None, address: str = None, 
                   latitude: float = None, longitude: float = None,
                   current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if full_name:
        current_user.full_name = full_name
    if phone:
        current_user.phone = phone
    if address:
        current_user.address = address
    if latitude:
        current_user.latitude = latitude
    if longitude:
        current_user.longitude = longitude
    
    db.commit()
    db.refresh(current_user)
    return current_user
