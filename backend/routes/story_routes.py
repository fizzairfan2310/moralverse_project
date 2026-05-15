from flask import Blueprint
from controllers.story_controller import *

story_bp = Blueprint('stories', __name__)

story_bp.route('/api/stories', methods=['POST'])(create_story)
story_bp.route('/api/stories', methods=['GET'])(get_all_stories)
story_bp.route('/api/stories/<int:story_id>', methods=['GET'])(get_story)
story_bp.route('/api/stories/<int:story_id>', methods=['PUT'])(update_story)
story_bp.route('/api/stories/<int:story_id>', methods=['DELETE'])(delete_story)