import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask
from flask_cors import CORS
from routes.character_routes import character_bp
from routes.story_routes import story_bp
from routes.user_routes import user_bp

app = Flask(__name__)
CORS(app)

from database.db import init_db
try:
    init_db()
except Exception as e:
    print(f"Warning: Failed to initialize database on startup: {e}")

# Register blueprints
app.register_blueprint(character_bp)
app.register_blueprint(story_bp)
app.register_blueprint(user_bp)

@app.route('/')
def home():
    return {"message": "Moralverse API is running!"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)