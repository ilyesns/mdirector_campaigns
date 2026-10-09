import logging
import time

from app.jobs.queue import job_app

logger = logging.getLogger(__name__)


@job_app.task(name="ping")
def ping(message: str) -> str:
    time.sleep(2)  # pretend to do slow work
    logger.warning("ping job done: %s", message)
    return message