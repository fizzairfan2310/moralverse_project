from database.db import get_db_connection

def setup_admin():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Delete if exists to ensure clean state
        cursor.execute("DELETE FROM users WHERE username = 'admin'")
        # Insert master admin
        cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ('admin', 'admin123', 'admin'))
        conn.commit()
        conn.close()
        print("✅ Master Admin Created: admin / admin123")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    setup_admin()
