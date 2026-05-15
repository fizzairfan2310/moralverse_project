from database.db import get_db_connection, get_placeholder

class Character:
    @staticmethod
    def create(name, role, description, image_url=None, animation_type='static', 
               animation_url=None, voice_type='default'):
        conn = get_db_connection()
        cursor = conn.cursor()
        p = get_placeholder()
        query = f"""
            INSERT INTO characters 
            (name, role, description, image_url, animation_type, animation_url, voice_type) 
            VALUES ({p}, {p}, {p}, {p}, {p}, {p}, {p})
        """
        cursor.execute(query, (name, role, description, image_url, animation_type, animation_url, voice_type))
        conn.commit()
        # Handle lastrowid for both SQLite and PostgreSQL
        if hasattr(cursor, 'lastrowid'):
            character_id = cursor.lastrowid
        else:
            # PostgreSQL way to get last ID
            cursor.execute("SELECT LASTVAL()")
            character_id = cursor.fetchone()['lastval']
            
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
        p = get_placeholder()
        cursor.execute(f"SELECT * FROM characters WHERE character_id = {p}", (character_id,))
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
        p = get_placeholder()
        query = f"""
            UPDATE characters 
            SET name={p}, role={p}, description={p}, image_url={p}, 
                animation_type={p}, animation_url={p}, voice_type={p}
            WHERE character_id={p}
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
        p = get_placeholder()
        cursor.execute(f"DELETE FROM characters WHERE character_id = {p}", (character_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Character deleted successfully"}