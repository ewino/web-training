from flask import Flask

from .. import config
from .views import app_views

app = Flask(__name__.split('.')[0])
app.debug = config.DEBUG
app.template_folder = config.TEMPLATE_FOLDER

app.register_blueprint(app_views)
