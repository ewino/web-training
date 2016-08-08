import os

# Debug settings.
DEBUG = False
# Important folders.
PROJECT_FOLDER = os.path.dirname(__file__)
STATIC_FOLDER = os.path.join(PROJECT_FOLDER, 'static')
TEMPLATE_FOLDER = os.path.join(STATIC_FOLDER, 'build')
# Server details.
IP = '127.0.0.1'
PORT = 5000
