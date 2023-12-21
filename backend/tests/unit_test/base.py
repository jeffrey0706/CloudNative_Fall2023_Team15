from app.models.session import Session
from flask import session
from flask_testing import TestCase
from app.utils import create_app

from app import db

class UnitTestSettingBase(TestCase):
    def create_app(self):
        app = create_app('testing')

        return app

    def setUp(self):
        self.client = self.app.test_client()
        with self.app.app_context():
            # db.metadata.clear()
            db.create_all()
        with self.client.session_transaction() as sess:
            sess = Session()

    def tearDown(self):
        with self.app.app_context():
            db.metadata.clear()
            db.drop_all()
        with self.app.test_request_context():
            session.clear()