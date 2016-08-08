from flask import Blueprint, render_template, request
import logbook
import ujson

from uniforms.uniforms import get_departments, get_products, buy_product
from unistore import config

logger = logbook.Logger('Unistore')

app_views = Blueprint('app_views', __name__, template_folder=config.TEMPLATE_FOLDER)


def _handle_uniforms_function(func, *args):
    """
    Wrap uniforms functions with JSON and errors handling code.

    :param func: The uniforms function to run.
    :param args: The original function arguments.
    :return: The function's return value as JSON, or an error JSON ({'Error': error_message}).
    """
    try:
        return ujson.dumps(func(args))
    except ValueError as ex:
        error_string = str(ex)
        logger.error(error_string)
        return ujson.dumps({'Error:': str(error_string)})


@app_views.route('/api/departments', methods=['GET'])
def get_departments():
    return ujson.dumps(get_departments())


@app_views.route('/api/departments/<int:department_id>/products', methods=['GET'])
def get_products(department_id):
    return _handle_uniforms_function(get_products, department_id)


@app_views.route('/api/departments/<int:department_id>/products/<int:product_id>/buy', methods=['POST'])
def buy_product(department_id, product_id):
    # Get the buying amount from the request data.
    data = ujson.loads(request.data)
    amount = data.get('amount')
    if amount is None:
        return ujson.dumps({'Error:': 'No buying amount was given!'})
    return _handle_uniforms_function(buy_product, department_id, product_id, amount)


@app_views.route('/<path:path>')
@app_views.route('/')
def index(path=None):
    return render_template('index.html', config=config)
