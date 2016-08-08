from flask import Flask
from flask import render_template

from .. import config

app = Flask(__name__, template_folder='static/build')


@app.route('/<path:path>')
@app.route('/')
def home(path=None):
    return render_template('index.html', config=config)
