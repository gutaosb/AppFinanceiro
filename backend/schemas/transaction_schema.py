from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionModel(BaseModel):
    value: float
    type: str
    justify: Optional[str] = None

class TransactionCreate(TransactionModel):
    user_id: int  # por enquanto é passado manualmente

# class TransactionGetUser(BaseModel):
#     user_id: int

class TransactionUpdate(BaseModel):
    value: Optional[float] = None
    type: Optional[str] = None
    justify: Optional[str] = None

class TransactionResponse(TransactionModel):
    id: int
    user_id: int
    created_at: datetime

class Config:
    orm_mode = True  # permite converter objetos SQLAlchemy