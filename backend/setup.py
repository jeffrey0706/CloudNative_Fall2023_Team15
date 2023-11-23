from distutils.core import setup
from setuptools import find_packages
requires = [
    'Flask>=3.0.0',
    'Flask-MySQL>=1.5.2',
    'Flask_SQLAlchemy>=3.1.1',
]
if __name__ == "__main__":
    setup(
        name="parking_system_backend",
        version="0.0.1",
        packages=find_packages(),
        author='Anderson',
        author_email='adnchao@gmail.com',
        install_requires=requires,
        description='The backend API server to fetch data from MySQL',
        include_package_data=True,
    )