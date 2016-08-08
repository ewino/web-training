import ujson

import logbook
from flask import render_template, Blueprint

from uniforms.uniforms import get_departments, get_products, buy_product
from unistore import config

logger = logbook.Logger('Unistore')

app_views = Blueprint('app_views', __name__, template_folder=config.TEMPLATE_FOLDER)


@app_views.route('/api/departments', methods=['GET'])
def get_departments():
    return ujson.dumps(get_departments())


@app_views.route('/api/departments/<int:department_id>/products', methods=['GET'])
def get_products(department_id):
    return ujson.dumps(get_products(department_id))


@app_views.route('/api/departments/<int:department_id>/products/<int:product_id>/buy', methods=['POST'])
def buy_product(department_id, product_id):
    return ujson.dumps(buy_product(department_id, product_id))


@app_views.route('/<path:path>')
@app_views.route('/')
def index(path=None):
    return render_template('index.html', config=config)
