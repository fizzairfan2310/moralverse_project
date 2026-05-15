from flask import jsonify, request
from models.character import Character

def create_character():
    data = request.json
    result = Character.create(
        data['name'], 
        data['role'], 
        data['description'],
        data.get('image_url', None),
        data.get('animation_type', 'static'),
        data.get('animation_url', None),
        data.get('voice_type', 'default')
    )
    return jsonify(result), 201

def get_all_characters():
    characters = Character.get_all()
    return jsonify(characters), 200

def get_character(character_id):
    character = Character.get_by_id(character_id)
    if character:
        return jsonify(character), 200
    return jsonify({"error": "Character not found"}), 404

def update_character(character_id):
    data = request.json
    result = Character.update(
        character_id, 
        data['name'], 
        data['role'], 
        data['description'],
        data.get('image_url', None),
        data.get('animation_type', 'static'),
        data.get('animation_url', None),
        data.get('voice_type', 'default')
    )
    return jsonify(result), 200

def delete_character(character_id):
    result = Character.delete(character_id)
    return jsonify(result), 200