from flask import Blueprint
from controllers.user_controller import *

user_bp = Blueprint('users', __name__)

user_bp.route('/api/signup', methods=['POST'])(signup)
user_bp.route('/api/login', methods=['POST'])(login)
user_bp.route('/api/users', methods=['GET'])(get_all_users)
user_bp.route('/api/users/<int:user_id>', methods=['DELETE'])(delete_user)
user_bp.route('/api/users/<int:user_id>', methods=['PUT'])(update_user)