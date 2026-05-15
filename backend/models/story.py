from database.db import get_db_connection

class Story:
    @staticmethod
    def create(title, moral_lesson, story_text, character_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO stories (title, moral_lesson, story_text, character_id) VALUES (?, ?, ?, ?)"
        cursor.execute(query, (title, moral_lesson, story_text, character_id))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Story created successfully"}

    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM stories")
        rows = cursor.fetchall()
        stories = [dict(row) for row in rows]
        cursor.close()
        conn.close()
        return stories

    @staticmethod
    def get_by_id(story_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM stories WHERE story_id = ?", (story_id,))
        row = cursor.fetchone()
        story = dict(row) if row else None
        cursor.close()
        conn.close()
        return story

    @staticmethod
    def update(story_id, title, moral_lesson, story_text, character_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "UPDATE stories SET title=?, moral_lesson=?, story_text=?, character_id=? WHERE story_id=?"
        cursor.execute(query, (title, moral_lesson, story_text, character_id, story_id))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Story updated successfully"}

    @staticmethod
    def delete(story_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM stories WHERE story_id = ?", (story_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Story deleted successfully"}