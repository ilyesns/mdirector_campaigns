import procrastinate

from app.core.config import settings


def _conninfo() -> str:
    # SQLAlchemy wants "postgresql+psycopg://", psycopg itself wants "postgresql://"
    return settings.database_url.replace("postgresql+psycopg://", "postgresql://", 1)


job_app = procrastinate.App(
    connector=procrastinate.PsycopgConnector(conninfo=_conninfo()),
    import_paths=["app.jobs.tasks"],
)