import unittest
import requests

class TestAPI(unittest.TestCase):
    BASE_URL = "http://localhost:5000/comments"

    def test_add_comment(self):
        # Test data
        tweet_id = 1
        data = {
            "user_id": 1,
            "comment": "This is a test comment"
        }

        # Send POST request
        response = requests.post(f"{self.BASE_URL}/{tweet_id}", json=data)

        # Check response status code and message
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['message'], 'Comment added successfully')

    def test_delete_comment(self):
        # Test data
        tweet_id = 1
        comment_id = 1  # Replace with actual comment ID

        # Send DELETE request
        response = requests.delete(f"{self.BASE_URL}/{tweet_id}/{comment_id}")

        # Check response status code and message
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Comment deleted successfully')

if __name__ == "__main__":
    unittest.main()