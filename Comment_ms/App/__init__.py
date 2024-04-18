from flask import Flask
import pymysql.cursors  # Import PyMySQL

def create_app(config_filename='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)

    # Establish a database connection
    app.db = pymysql.connect(
        host='mariadb.vamk.fi',
        user='e2101065',
        password='DZCtWC5pEC2',
        db='e2101065_comment',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    from .routes import comments_blueprint
    app.register_blueprint(comments_blueprint)

    return app