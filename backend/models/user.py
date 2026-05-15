from database.db import get_db_connection, get_placeholder

class User:
    @staticmethod
    def create(username, password, role='user'):
        conn = get_db_connection()
        cursor = conn.cursor()
        p = get_placeholder()
        query = f"INSERT INTO users (username, password, role) VALUES ({p}, {p}, {p})"
        cursor.execute(query, (username, password, role))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "User created successfully"}

    @staticmethod
    def get_by_username(username):
        conn = get_db_connection()
        cursor = conn.cursor()
        p = get_placeholder()
        cursor.execute(f"SELECT * FROM users WHERE username = {p}", (username,))
        row = cursor.fetchone()
        user = dict(row) if row else None
        cursor.close()
        conn.close()
        return user

    @staticmethod
    def get_all():
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT user_id, username, role FROM users")
        rows = cursor.fetchall()
        users = [dict(row) for row in rows]
        cursor.close()
        conn.close()
        return users

    @staticmethod
    def delete(user_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        p = get_placeholder()
        cursor.execute(f"DELETE FROM users WHERE user_id = {p}", (user_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "User deleted successfully"}

    @staticmethod
    def update(user_id, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        p = get_placeholder()
        role = data.get('role')
        cursor.execute(f"UPDATE users SET role = {p} WHERE user_id = {p}", (role, user_id))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "User updated successfully"}