from flask import Flask, jsonify
from flask.templating import render_template

from boilerplate.colors import match_color

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/color/<query>')
def get_color(query):
    return jsonify(colors=match_color(query))

app.run(debug=True)
