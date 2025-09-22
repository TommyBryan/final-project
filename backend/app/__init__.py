from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Import configuration (to be done)
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Register blueprints (routes)
    from app.routes import users, subjects, flashcards
    app.register_blueprint(users.bp)
    app.register_blueprint(subjects.bp)
    app.register_blueprint(flashcards.bp)

    return app
