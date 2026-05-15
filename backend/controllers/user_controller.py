from flask import jsonify, request
from models.user import User

def signup():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        username = data.get('username')
        password = data.get('password')
        role = data.get('role', 'user')
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400
        
        # Check if user already exists
        existing_user = User.get_by_username(username)
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400
        
        result = User.create(username, password, role)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": f"Signup failed: {str(e)}"}), 500

def login():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400
            
        user = User.get_by_username(username)
        
        if not user:
            return jsonify({"error": "Invalid username or password"}), 401
        
        if user['password'] != password:
            return jsonify({"error": "Invalid username or password"}), 401
        
        return jsonify({
            "message": "Login successful",
            "user": {
                "user_id": user['user_id'],
                "username": user['username'],
                "role": user['role']
            }
        }), 200
    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500

def get_all_users():
    try:
        users = User.get_all()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_user(user_id):
    try:
        result = User.delete(user_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def update_user(user_id):
    try:
        data = request.json
        result = User.update(user_id, data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500