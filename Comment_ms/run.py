from flask import Flask
import pymysql.cursors

def create_app():
    app = Flask(__name__)

    # Establish a database connection
    app.db = pymysql.connect(
        host='mariadb.vamk.fi',
        user='e2101065',
        password='DZCtWC5pEC2',
        db='e2101065_comment',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    @app.route('/')
    def home():
        return 'Hello, World!'

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)