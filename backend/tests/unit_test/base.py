from flask_testing import TestCase
from app.utils import create_app

class UnitTestSettingBase(TestCase):
    def create_app(self):
        return create_app('testing')
