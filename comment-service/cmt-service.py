from flask import Flask, Blueprint, request, jsonify
import requests
import pymysql.cursors

# Assuming the base URL of the Tweet service
TWEET_SERVICE_BASE_URL = "http://localhost/tweets"

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

    comments_blueprint = Blueprint('comments', __name__)

    @comments_blueprint.route('/comments/<int:tweet_id>', methods=['POST'])
    def add_comment(tweet_id):
        data = request.json
        user_id = data.get('user_id')
        comment_text = data.get('comment')

        if not user_id or not comment_text:
            return jsonify({'error': 'User ID and comment text are required'}), 400

        # Make a POST request to the Tweet service to add the comment
        endpoint_url = f"{TWEET_SERVICE_BASE_URL}/{tweet_id}/comment"
        payload = {
            "user_id": user_id,
            "comment_content": comment_text
        }
        response = requests.post(endpoint_url, json=payload)

        if response.status_code == 201:
            return jsonify({'message': 'Comment added successfully'}), 201
        else:
            return jsonify({'error': 'Failed to add comment'}), response.status_code

    @comments_blueprint.route('/comments/<int:tweet_id>/<int:comment_id>', methods=['DELETE'])
    def delete_comment(tweet_id, comment_id):
        # Make a DELETE request to the Tweet service to remove the comment
        endpoint_url = f"{TWEET_SERVICE_BASE_URL}/{tweet_id}/comment/{comment_id}"
        response = requests.delete(endpoint_url)

        if response.status_code == 200:
            return jsonify({'message': 'Comment deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to delete comment'}), response.status_code

    app.register_blueprint(comments_blueprint)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)