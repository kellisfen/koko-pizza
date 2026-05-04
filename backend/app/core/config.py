from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "Koko Pizza API"
    DEBUG: bool = False
    
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/koko_pizza"
    SECRET_KEY: str  # Обязательно из .env — нет значения по умолчанию
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    class Config:
        env_file = ".env"
        extra = "ignore"  # Разрешает дополнительные поля в .env


@lru_cache()
def get_settings():
    return Settings()
