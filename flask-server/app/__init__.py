from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_executor import Executor
from flask_cors import CORS

executor = Executor()  # Declare the executor globally
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins (for dev purposes only)


    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    executor.init_app(app)  # Initialize Flask-Executor with the app

    # Register blueprints
    from app.routes import auth_routes
    from app.routes import dashboard_routes
    from app.routes import goals_routes
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(dashboard_routes.bp)
    app.register_blueprint(goals_routes.bp)

    return app