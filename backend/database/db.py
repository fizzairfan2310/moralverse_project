import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'moralverse.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )
    """)
    
    # Create Characters table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS characters (
        character_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    
    # Create Stories table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS stories (
        story_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        moral_lesson TEXT,
        story_text TEXT,
        character_id INTEGER,
        FOREIGN KEY (character_id) REFERENCES characters(character_id) ON DELETE SET NULL
    )
    """)
    
    conn.commit()
    conn.close()