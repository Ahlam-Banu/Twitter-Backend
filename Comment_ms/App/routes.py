from flask import Blueprint

comments_blueprint = Blueprint('comments', __name__)

@comments_blueprint.route('/comments/<int:tweet_id>', methods=['GET'])
def get_comments(tweet_id):
    # Logic to fetch comments for a tweet
    pass

@comments_blueprint.route('/comments/<int:tweet_id>', methods=['POST'])
def add_comment(tweet_id):
    # Logic to add a comment to a tweet
    pass
