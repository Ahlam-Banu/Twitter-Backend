from flask import Flask
from flask_cors import CORS
from tweet_service import tweet_service_bp
from user_service import user_service_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.register_blueprint(tweet_service_bp)
app.register_blueprint(user_service_bp)


if __name__ == '__main__':
    app.run(debug=True, port=8181)