import unittest
from App import create_app
from App.db import db

class TestCommentsRoutes(unittest.TestCase):
    def test_get_comments(self):
        # Write test cases for your GET /comments/<tweet_id> route
        pass

    def test_add_comment(self):
        # Write test cases for your POST /comments/<tweet_id> route
        pass

if __name__ == '__main__':
    unittest.main()
