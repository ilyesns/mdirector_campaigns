from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.modules.auth.router import router as auth_router
app = FastAPI(title="MDirector Campaigns")
app.include_router(auth_router)

@app.get("/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok", "db": "ok"}