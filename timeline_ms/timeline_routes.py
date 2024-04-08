from flask import jsonify, request
from timeline_ms import app
from .timeline_model import Timeline
from peewee import DoesNotExist

from flask import jsonify, request
from timeline_ms import app
from .timeline_model import Timeline
from ..tweet_ms.tweet_model import Tweet
from peewee import DoesNotExist

# Route to retrieve all tweets in the timeline for a specific user
@app.route('/timeline/<int:user_id>/tweets', methods=['GET'])
def get_timeline_tweets(user_id):
    try:
        # Assuming each Timeline entry has a foreign key reference to the Tweet model
        tweets = (Tweet
                  .select()
                  .join(Timeline)
                  .where(Timeline.user_id == user_id))

        tweet_data = [{
            'tweet_id': tweet.tweet_id,
            'content': tweet.content,  # Assuming there's a 'content' field in your Tweet model
            # Add other fields as needed
        } for tweet in tweets]

        return jsonify(tweet_data), 200
    except DoesNotExist:
        return jsonify({'error': 'No tweets found in the timeline for the specified user'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# # Route to retrieve timeline for a specific user
# @app.route('/timeline/<int:user_id>', methods=['GET'])
# def get_timeline(user_id):
#     try:
#         timeline_entries = Timeline.select().where(Timeline.user_id == user_id)
#         timeline_data = [{
#             'timeline_id': entry.timeline_id,
#             'user_id': entry.user_id,
#             'tweet_id': entry.tweet_id
#         } for entry in timeline_entries]
#         return jsonify(timeline_data), 200
#     except DoesNotExist:
#         return jsonify({'error': 'No timeline entries found for the specified user'}), 404
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # Route to add a tweet to the timeline
# @app.route('/timeline/add', methods=['POST'])
# def add_to_timeline():
#     data = request.json
#     user_id = data.get('user_id')
#     tweet_id = data.get('tweet_id')
#     try:
#         new_entry = Timeline.create(user_id=user_id, tweet_id=tweet_id)
#         return jsonify({'message': 'Tweet added to timeline successfully', 'timeline_id': new_entry.timeline_id}), 201
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # Route to remove a tweet from the timeline
# @app.route('/timeline/remove/<int:timeline_id>', methods=['DELETE'])
# def remove_from_timeline(timeline_id):
#     try:
#         entry = Timeline.get(Timeline.timeline_id == timeline_id)
#         entry.delete_instance()
#         return jsonify({'message': 'Timeline entry deleted successfully'}), 200
#     except DoesNotExist:
#         return jsonify({'error': 'Timeline entry not found'}), 404
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


