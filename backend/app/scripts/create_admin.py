import getpass

from sqlalchemy import select

from app.core.security import hash_password
from app.db.models import User
from app.db.session import SessionLocal


def main():
    email = input("Email: ").strip().lower()
    full_name = input("Full name: ").strip()
    password = getpass.getpass("Password (min 10 chars): ")

    if len(password) < 10:
        print("Password too short.")
        return

    with SessionLocal() as db:
        if db.scalar(select(User).where(User.email == email)):
            print("A user with this email already exists.")
            return
        db.add(User(
            email=email,
            full_name=full_name,
            hashed_password=hash_password(password),
            role="admin",
            is_active=True,
        ))
        db.commit()

    print(f"Admin {email} created.")


if __name__ == "__main__":
    main()