from flask import jsonify, request
from models.user import User

def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'user')
    
    # Check if user already exists
    existing_user = User.get_by_username(username)
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400
    
    result = User.create(username, password, role)
    return jsonify(result), 201

def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
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

def get_all_users():
    users = User.get_all()
    return jsonify(users), 200

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