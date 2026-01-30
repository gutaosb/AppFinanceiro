from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.transaction_model import Transaction
from schemas.transaction_schema import TransactionResponse, TransactionCreate, TransactionUpdate
from database import SessionLocal
from datetime import datetime

router = APIRouter(prefix="/transactions", tags=["Transactions"])

#Dependencia para sessao do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


#Rotas de transacoes

#criar
@router.post("/", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    new_transaction = Transaction(
        user_id=transaction.user_id,
        value=transaction.value,
        type=transaction.type,
        justify=transaction.justify,
        created_at=datetime.now(),
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction



#lista todas as transacoes
@router.get("/", response_model=list[TransactionResponse])
def get_all_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()


#listar transacoes de um usuario específico
@router.get("/user/{user_id}", response_model=list[TransactionResponse])
def get_user_transaction(user_id: int, db: Session = Depends(get_db)):
    user_transactions = db.query(Transaction).filter(Transaction.user_id == user_id).all()
    if not user_transactions:
        raise HTTPException(status_code=404, detail="Nenhuma transação encontrada para este usuário")
    return user_transactions


#editar transacao
@router.put("/{transaction_id}", response_model=TransactionResponse)
def update_transaction(transaction_id: int, data: TransactionUpdate, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transação não encontrada")

    # Atualiza apenas os campos informados
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(transaction, key, value)

    db.commit()
    db.refresh(transaction)
    return transaction


#deletar transacao
@router.delete("/{transaction_id}", response_model=TransactionResponse)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transação não encontrada")
    db.delete(transaction)
    db.commit()
    return transaction

#deletar todas as transacoes de um usuario
@router.delete("/user/{user_id}", response_model=list[TransactionResponse])
def delete_user_transactions(user_id: int, db: Session = Depends(get_db)):
    transactions = db.query(Transaction).filter(Transaction.user_id == user_id).all()
    if not transactions:
        raise HTTPException(status_code=404, detail="Nenhuma transação encontrada para este usuário")
    
    for transaction in transactions:
        db.delete(transaction)
    db.commit()
    return transactions