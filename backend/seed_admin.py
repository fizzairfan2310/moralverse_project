import os
from dotenv import load_dotenv

load_dotenv()

from database.db import init_db
from models.user import User

init_db()

try:
    User.create('admin', 'admin123', 'admin')
    print("Admin user created successfully!")
except Exception as e:
    print(f"Error creating admin (might already exist): {e}")
