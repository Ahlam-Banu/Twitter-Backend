# tweet_ms/tweet_routes.py
from flask import jsonify, request
from tweet_ms import app
from .tweet_model import Tweet
from peewee import DoesNotExist

# Route to handle tweet creation
@app.route('/tweets', methods=['POST'])
def create_tweet():
    data = request.json
    user_id = data.get('user_id')
    tweet_content = data.get('tweet_content')
    new_tweet = Tweet.create(user_id=user_id, tweet_content=tweet_content)
    return jsonify({'message': 'Tweet created successfully', 'tweet_id': new_tweet.tweet_id}), 201

# Route to handle tweet retrieval for a specific user
@app.route('/tweets/<int:user_id>', methods=['GET'])
def get_tweets(user_id):
    try:
        tweets = Tweet.select().where(Tweet.user_id == user_id)
        tweet_data = [{
            'tweet_id': tweet.tweet_id,
            'user_id': tweet.user_id,
            'tweet_content': tweet.tweet_content,
            'timestamp': tweet.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Format timestamp as string
            'likes_count': tweet.likes_count
        } for tweet in tweets]
        return jsonify(tweet_data), 200
    except DoesNotExist:
        return jsonify({'message': 'No tweets found for the specified user'}), 404

# Route to retrieve all tweets
@app.route('/tweets', methods=['GET'])
def get_all_tweets():
    try:
        # Retrieve all tweets from the database
        tweets = Tweet.select()

        # Serialize tweet data
        tweet_data = [{
            'tweet_id': tweet.tweet_id,
            'user_id': tweet.user_id,
            'tweet_content': tweet.tweet_content,
            'timestamp': tweet.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Format timestamp as string
            'likes_count': tweet.likes_count
        } for tweet in tweets]

        # Return JSON response with all tweets
        return jsonify(tweet_data), 200
    except Exception as e:
        # Log the exception for debugging purposes
        app.logger.error(f"An error occurred while retrieving tweets: {e}")
        # Return an error response
        return jsonify({'error': 'An error occurred while retrieving tweets. Please try again later.'}), 500

# Route to update a tweet
@app.route('/tweets/<int:tweet_id>', methods=['PUT'])
def update_tweet(tweet_id):
    try:
        tweet = Tweet.get(Tweet.tweet_id == tweet_id)
        data = request.json
        tweet.tweet_content = data.get('tweet_content')
        tweet.save()
        return jsonify({'message': 'Tweet updated successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Tweet not found'}), 404

# Route to delete a tweet
@app.route('/tweets/<int:tweet_id>', methods=['DELETE'])
def delete_tweet(tweet_id):
    try:
        tweet = Tweet.get(Tweet.tweet_id == tweet_id)
        tweet.delete_instance()
        return jsonify({'message': 'Tweet deleted successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Tweet not found'}), 404

# Route to like/unlike a tweet
@app.route('/tweets/<int:tweet_id>/like', methods=['POST'])
def like_tweet(tweet_id):
    try:
        tweet = Tweet.get(Tweet.tweet_id == tweet_id)
        tweet.likes_count += 1
        tweet.save()
        return jsonify({'message': 'Tweet liked successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Tweet not found'}), 404