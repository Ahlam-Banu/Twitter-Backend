from flask import Flask
from .db import db  # Add missing import statement

def create_app(config_filename='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)

    db.init_app(app)

    from .routes import comments_blueprint
    app.register_blueprint(comments_blueprint)

    return app
