from pydantic import BaseModel, EmailStr, field_validator
import re


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: int | None = None


class UserCreate(BaseModel):
    email: EmailStr
    password: str  # Минимум 8 символов, буквы и цифры
    full_name: str | None = None
    phone: str | None = None

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Пароль должен быть минимум 8 символов")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("Пароль должен содержать буквы")
        if not re.search(r"\d", v):
            raise ValueError("Пароль должен содержать цифры")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str | None
    phone: str | None
    role: str
    address: str | None
    class Config:
        from_attributes = True
