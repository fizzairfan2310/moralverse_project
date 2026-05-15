from database.db import get_db_connection

class Character:
    @staticmethod
    def create(name, role, description, image_url=None, animation_type='static', 
               animation_url=None, voice_type='default'):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO characters 
            (name, role, description, image_url, animation_type, animation_url, voice_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        cursor.execute(query, (name, role, description, image_url, animation_type, animation_url, voice_type))
        conn.commit()
        character_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return {"message": "Character created successfully", "character_id": character_id}

    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM characters ORDER BY created_at DESC")
        rows = cursor.fetchall()
        characters = [dict(row) for row in rows]
        cursor.close()
        conn.close()
        return characters

    @staticmethod
    def get_by_id(character_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM characters WHERE character_id = ?", (character_id,))
        row = cursor.fetchone()
        character = dict(row) if row else None
        cursor.close()
        conn.close()
        return character

    @staticmethod
    def update(character_id, name, role, description, image_url=None, 
               animation_type='static', animation_url=None, voice_type='default'):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            UPDATE characters 
            SET name=?, role=?, description=?, image_url=?, 
                animation_type=?, animation_url=?, voice_type=?
            WHERE character_id=?
        """
        cursor.execute(query, (name, role, description, image_url, animation_type, animation_url, voice_type, character_id))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Character updated successfully"}

    @staticmethod
    def delete(character_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM characters WHERE character_id = ?", (character_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Character deleted successfully"}