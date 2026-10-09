from fastapi import APIRouter, Depends

from app.db.models import User
from app.jobs.tasks import ping
from app.modules.auth.deps import require_role

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/ping", status_code=202)
async def enqueue_ping(
    message: str = "hello",
    user: User = Depends(require_role("admin")),
):
    job_id = await ping.defer_async(message=message)
    return {"job_id": job_id}