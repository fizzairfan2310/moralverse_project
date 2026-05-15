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
                INSERT INTO characters (character_id, name, role, description, image_url, animation_type, animation_url, voice_type, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (character_id) DO NOTHING
            """, (c['character_id'], c['name'], c['role'], c['description'], c['image_url'], c['animation_type'], c['animation_url'], c['voice_type'], c['created_at']))

        # Migrate Stories
        print("Migrating Stories...")
        sqlite_cursor.execute("SELECT * FROM stories")
        stories = sqlite_cursor.fetchall()
        for s in stories:
            pg_cursor.execute("""
                INSERT INTO stories (story_id, title, moral_lesson, story_text, character_id)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (story_id) DO NOTHING
            """, (s['story_id'], s['title'], s['moral_lesson'], s['story_text'], s['character_id']))

        # Reset sequences so future inserts work correctly
        pg_cursor.execute("SELECT setval('characters_character_id_seq', (SELECT MAX(character_id) FROM characters))")
        pg_cursor.execute("SELECT setval('stories_story_id_seq', (SELECT MAX(story_id) FROM stories))")

        # Commit stories and characters first
        pg_conn.commit()

        # Migrate regular Users (excluding admin which we already created)
        print("Migrating Users...")
        sqlite_cursor.execute("SELECT * FROM users WHERE username != 'admin'")
        users = sqlite_cursor.fetchall()
        for u in users:
            try:
                # Use a savepoint to rollback only the failed user insert
                pg_cursor.execute("SAVEPOINT user_insert")
                pg_cursor.execute("""
                    INSERT INTO users (username, password, role)
                    VALUES (%s, %s, %s)
                """, (u['username'], u['password'], u['role']))
                pg_cursor.execute("RELEASE SAVEPOINT user_insert")
            except Exception as e:
                pg_cursor.execute("ROLLBACK TO SAVEPOINT user_insert")
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
