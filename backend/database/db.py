import os
import psycopg2
from psycopg2.extras import RealDictCursor
import sqlite3

# Connection String for Supabase (Will be set in Vercel/Local Env)
DATABASE_URL = os.getenv('DATABASE_URL')

def get_db_connection():
    if DATABASE_URL:
        # ☁️ Use Cloud PostgreSQL (Supabase) with SSL
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor, sslmode='require')
        return conn
    else:
        # 📁 Fallback to Local SQLite
        db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'moralverse.db')
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        return conn

def get_placeholder():
    return "%s" if DATABASE_URL else "?"

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if DATABASE_URL:
        # PostgreSQL Syntax
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS characters (
            character_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT,
            description TEXT,
            image_url TEXT,
            animation_type TEXT DEFAULT 'static',
            animation_url TEXT,
            voice_type TEXT DEFAULT 'default',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS stories (
            story_id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            moral_lesson TEXT,
            story_text TEXT,
            character_id INTEGER REFERENCES characters(character_id) ON DELETE SET NULL
        )
        """)
    else:
        # SQLite Syntax
        cursor.execute("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT DEFAULT 'user')")
        cursor.execute("CREATE TABLE IF NOT EXISTS characters (character_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT, description TEXT, image_url TEXT, animation_type TEXT DEFAULT 'static', animation_url TEXT, voice_type TEXT DEFAULT 'default', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
        cursor.execute("CREATE TABLE IF NOT EXISTS stories (story_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, moral_lesson TEXT, story_text TEXT, character_id INTEGER, FOREIGN KEY (character_id) REFERENCES characters(character_id) ON DELETE SET NULL)")

    conn.commit()
    cursor.close()
    conn.close()