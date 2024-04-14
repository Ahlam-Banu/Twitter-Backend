from flask import Blueprint, request, jsonify
import requests

tweet_service_bp = Blueprint('tweet_service', __name__)

tweet_service_url = "http://localhost:5001"

@tweet_service_bp.route('/tweets', methods=['POST'])
def create_tweet():
    response = requests.post(f"{tweet_service_url}/tweets", json=request.json)
    return jsonify(response.json()), response.status_code

@tweet_service_bp.route('/tweets', methods=['GET'])
def get_all_tweets():
     response = requests.get(f"{tweet_service_url}/tweets")
     return jsonify(response.json()), response.status_code

@tweet_service_bp.route('/tweets/<int:tweet_id>', methods=['GET'])
def get_tweets(tweet_id):
    response = requests.get(f"{tweet_service_url}/tweets/{tweet_id}")
    return jsonify(response.json()), response.status_code

@tweet_service_bp.route('/tr/tweets/<int:tweet_id>', methods=['GET'])
def get_tr_tweets(tweet_id):
    response = requests.get(f"{tweet_service_url}/tr/tweets/{tweet_id}")
    return jsonify(response.json()), response.status_code

@tweet_service_bp.route('/tweets/<int:tweet_id>', methods=['PUT'])
def update_tweet(tweet_id):
    data = request.json
    response = requests.get(f"{tweet_service_url}/tweets/{tweet_id}" , json=data)
    return jsonify(response.json()), response.status_code

@tweet_service_bp.route('/tweets/<int:tweet_id>', methods=['DELETE'])
def delete_tweet(tweet_id):
    response = requests.get(f"{tweet_service_url}/tweets/{tweet_id}")
    return jsonify(response.json()), response.status_code

