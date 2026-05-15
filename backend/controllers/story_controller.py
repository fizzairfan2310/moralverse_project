from flask import jsonify, request
from models.story import Story

def create_story():
    data = request.json
    result = Story.create(data['title'], data['moral_lesson'], data['story_text'], data['character_id'])
    return jsonify(result), 201

def get_all_stories():
    stories = Story.get_all()
    return jsonify(stories), 200

def get_story(story_id):
    story = Story.get_by_id(story_id)
    if story:
        return jsonify(story), 200
    return jsonify({"error": "Story not found"}), 404

def update_story(story_id):
    data = request.json
    result = Story.update(story_id, data['title'], data['moral_lesson'], data['story_text'], data['character_id'])
    return jsonify(result), 200

def delete_story(story_id):
    result = Story.delete(story_id)
    return jsonify(result), 200