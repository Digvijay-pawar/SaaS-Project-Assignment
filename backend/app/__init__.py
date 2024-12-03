from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Enable CORS for all domains (you can specify a domain in the argument if needed)
    CORS(app)  # This will enable CORS for all routes

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Set up other configurations for deployment, such as secret key for session management
    app.config['SECRET_KEY'] = 'your-secret-key'  # Add a secure secret key for sessions
    app.config['ENV'] = 'production'  # Set the environment to production

    db.init_app(app)

    # Register your blueprints
    with app.app_context():
        from .routes import bp as api_bp
        app.register_blueprint(api_bp, url_prefix='/api')

        # Import models and create tables if they don't exist
        from .models import Customer, Product, Subscription
        db.create_all()

    return app
