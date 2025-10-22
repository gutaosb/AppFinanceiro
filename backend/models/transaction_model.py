from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    value = Column(Float, nullable=False)
    type = Column(String, nullable=False) #"income" ou "expense"
    justify = Column(String)
    created_at = Column(DateTime, default=datetime.now())

    user = relationship("User", back_populates="transaction")