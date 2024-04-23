# tweet_ms/tweet_routes.py
from flask import jsonify, request
from tweet_ms import app
from .tweet_model import Tweet
from peewee import DoesNotExist
#from flask_cors import CORS
# from ..translate_service.translator import translate
# from .translator import translate

# Route to handle tweet creation
#CORS(app)
@app.route('/tweets', methods=['POST'])
def create_tweet():
    data = request.json
    user_id = data.get('user_id')
    tweet_content = data.get('tweet_content')
    new_tweet = Tweet.create(user_id=user_id, tweet_content=tweet_content)
    return jsonify({'message': 'Tweet created successfully', 'tweet_id': new_tweet.tweet_id}), 201

# Route to get all tweets
@app.route('/tweets', methods=['GET'])
def get_all_tweets():
    tweets = Tweet.select()
    tweet_data = [{
        'tweet_id': tweet.tweet_id,
        'user_id': tweet.user_id,
        'tweet_content': tweet.tweet_content,
        'timestamp': tweet.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Format timestamp as string
        'likes_count': tweet.likes_count
    } for tweet in tweets]
    return jsonify(tweet_data), 200

# Route to handle tweet retrieval for a specific user
@app.route('/tweets/<int:tweet_id>', methods=['GET'])
def get_tweets(tweet_id):
    try:
        tweets = Tweet.select().where(Tweet.tweet_id == tweet_id)
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

#  @app.route('/tr/tweets/<int:tweet_id>', methods=['GET'])
#  def get_tr_tweets(tweet_id):
#      try:
#          tweets = Tweet.select().where(Tweet.tweet_id == tweet_id)
#          tweet_data = [{
#              'tweet_id': tweet.tweet_id,
#              'user_id': tweet.user_id,
#              'tweet_content': tweet.tweet_content,
#              'timestamp': tweet.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Format timestamp as string
#              'likes_count': tweet.likes_count
#          } for tweet in tweets]
        
#          for tweet in tweet_data:
#              res = translate(tweet['tweet_content'], source_lang='auto')  # source language as 'auto' for automatic detection
#              tweet['tweet_content'] = res  # Update tweet content with translated text
#              # Return the response immediately after translating the first tweet
#              return jsonify(res), 200

#      except DoesNotExist:
#          return jsonify({'message': 'No tweets found for the specified user'}), 404


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