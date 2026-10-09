from pydantic_settings import BaseSettings
from pydantic import SecretStr

class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    jwt_expire_minutes: int = 480

    mdirector_user: str
    mdirector_secret: SecretStr

settings = Settings()