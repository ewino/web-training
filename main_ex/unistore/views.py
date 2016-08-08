from flask import render_template, Blueprint
import logbook

from .. import config

logger = logbook.Logger('Unistore')

app_views = Blueprint('app_views', __name__, template_folder=config.TEMPLATE_FOLDER)


@app_views.route('/<path:path>')
@app_views.route('/')
def index(path=None):
    return render_template('index.html', config=config)
