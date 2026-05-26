import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth import auth_bp
from routes.chat import chat_bp
from routes.progress import progress_bp
from routes.sync import sync_bp
from routes.quiz import quiz_bp

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(progress_bp)
app.register_blueprint(sync_bp)
app.register_blueprint(quiz_bp)

if __name__ == "__main__":
    print("TutorIA backend modular rodando em http://localhost:5001")
    app.run(port=5001, debug=True)
