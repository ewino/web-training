from flask import Flask, jsonify
from flask import send_from_directory

from ptbs.colors import match_color

app = Flask(__name__)


@app.route('/')
def home():
    return send_from_directory(app.static_folder + '/app', 'index.html')


@app.route('/color/<query>')
def get_color(query):
    return jsonify(results=match_color(query))

app.run(debug=True)
