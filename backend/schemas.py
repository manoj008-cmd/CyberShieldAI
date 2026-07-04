from pydantic import BaseModel

class PredictionInput(BaseModel):
    features: list

class LoginRequest(BaseModel):
    username: str
    password: str