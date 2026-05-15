import sqlite3
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def migrate():
    # Connect to SQLite
    sqlite_conn = sqlite3.connect('moralverse.db')
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cursor = sqlite_conn.cursor()

    # Connect to Supabase
    DATABASE_URL = os.getenv('DATABASE_URL')
    if not DATABASE_URL:
        print("DATABASE_URL not found!")
        return

    pg_conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    pg_cursor = pg_conn.cursor()

    try:
        # Migrate Characters
        print("Migrating Characters...")
        sqlite_cursor.execute("SELECT * FROM characters")
        characters = sqlite_cursor.fetchall()
        for c in characters:
            pg_cursor.execute("""
                INSERT INTO characters (name, role, description, image_url, animation_type, animation_url, voice_type, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (c['name'], c['role'], c['description'], c['image_url'], c['animation_type'], c['animation_url'], c['voice_type'], c['created_at']))

        # Migrate Stories
        print("Migrating Stories...")
        sqlite_cursor.execute("SELECT * FROM stories")
        stories = sqlite_cursor.fetchall()
        for s in stories:
            # We don't migrate character_id perfectly if IDs changed, but let's just insert them 
            # Assuming characters were inserted in the same order and IDs match, but we'll omit character_id for safety if it causes FK constraint issues, OR we just use the same IDs.
            # Actually, to be safe, let's just insert with character_id. If characters table was empty, IDs should match 1:1.
            pg_cursor.execute("""
                INSERT INTO stories (title, moral_lesson, story_text, character_id)
                VALUES (%s, %s, %s, %s)
            """, (s['title'], s['moral_lesson'], s['story_text'], s['character_id']))

        # Migrate regular Users (excluding admin which we already created)
        print("Migrating Users...")
        sqlite_cursor.execute("SELECT * FROM users WHERE username != 'admin'")
        users = sqlite_cursor.fetchall()
        for u in users:
            try:
                pg_cursor.execute("""
                    INSERT INTO users (username, password, role)
                    VALUES (%s, %s, %s)
                """, (u['username'], u['password'], u['role']))
            except Exception as e:
                pg_conn.rollback()
                print(f"Skipped user {u['username']}: {e}")
                continue

        pg_conn.commit()
        print("Migration completely successful!")

    except Exception as e:
        print(f"Migration failed: {e}")
        pg_conn.rollback()
    finally:
        sqlite_cursor.close()
        sqlite_conn.close()
        pg_cursor.close()
        pg_conn.close()

if __name__ == "__main__":
    migrate()
