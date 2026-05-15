from flask import Blueprint
from controllers.character_controller import *

character_bp = Blueprint('characters', __name__)

character_bp.route('/api/characters', methods=['POST'])(create_character)
character_bp.route('/api/characters', methods=['GET'])(get_all_characters)
character_bp.route('/api/characters/<int:character_id>', methods=['GET'])(get_character)
character_bp.route('/api/characters/<int:character_id>', methods=['PUT'])(update_character)
character_bp.route('/api/characters/<int:character_id>', methods=['DELETE'])(delete_character)