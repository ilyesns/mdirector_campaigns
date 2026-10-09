from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.jobs.queue import job_app
from app.modules.auth.router import router as auth_router
from app.modules.jobs.router import router as jobs_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with job_app.open_async():  # connect the queue at startup, close at shutdown
        yield

app = FastAPI(title="MDirector Campaigns", lifespan=lifespan)
app.include_router(auth_router)
app.include_router(jobs_router)

@app.get("/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok", "db": "ok"}