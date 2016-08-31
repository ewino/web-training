from flask import Blueprint, json, jsonify, render_template, request
import logbook

from uniforms import uniforms
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
        return jsonify(func(*args))
    except ValueError as ex:
        error_string = str(ex)
        logger.error(error_string)
        response = jsonify(error=error_string)
        """ :type: werkzeug.wrappers.BaseResponse """
        response.status_code = 400
        return response


@app_views.route('/api/departments', methods=['GET'])
def get_departments():
    return _handle_uniforms_function(uniforms.get_departments)


@app_views.route('/api/departments/<int:department_id>', methods=['GET'])
def get_department(department_id):
    return _handle_uniforms_function(uniforms.get_department, department_id)


@app_views.route('/api/departments/<int:department_id>/products', methods=['GET'])
def get_products(department_id):
    return _handle_uniforms_function(uniforms.get_products, department_id)


@app_views.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    return _handle_uniforms_function(uniforms.get_product, product_id)


@app_views.route('/api/products/<int:product_id>/buy', methods=['POST'])
def buy_product(product_id):
    # Get the buying amount from the request data.
    data = json.loads(request.data)
    amount = data.get('amount')
    if amount is None:
        return jsonify({'Error:': 'No buying amount was given!'})
    return _handle_uniforms_function(uniforms.buy_product, product_id, amount)


@app_views.route('/<path:path>')
@app_views.route('/')
def index(path=None):
    return render_template('index.html', config=config)
