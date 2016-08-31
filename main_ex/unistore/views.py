from flask import Blueprint, json, jsonify, render_template, request
import logbook

from uniforms import uniforms
from unistore import config

logger = logbook.Logger('Unistore')

app_views = Blueprint('app_views', __name__, template_folder=config.TEMPLATE_FOLDER)


@app_views.route('/api/departments', methods=['GET'])
def get_departments():
    return jsonify(departments=uniforms.get_departments())


@app_views.route('/api/departments/<int:department_id>', methods=['GET'])
def get_department(department_id):
    return jsonify(uniforms.get_department(department_id))


@app_views.route('/api/departments/<int:department_id>/products', methods=['GET'])
def get_products(department_id):
    return jsonify(products=uniforms.get_products(department_id))


@app_views.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    return jsonify(uniforms.get_product(product_id))


@app_views.route('/api/products/<int:product_id>/buy', methods=['POST'])
def buy_product(product_id):
    # Get the buying amount from the request data.
    data = json.loads(request.data)
    amount = data.get('amount')
    if amount is None:
        raise ValueError('No buying amount was given!')
    return jsonify(uniforms.buy_product(product_id, amount))


@app_views.errorhandler(ValueError)
def handle_value_error(error):
    error_string = str(error)
    logger.error(error_string)
    response = jsonify(error=error_string)
    """ :type: werkzeug.wrappers.BaseResponse """
    response.status_code = 400
    return response


@app_views.route('/<path:path>')
@app_views.route('/')
def index(path=None):
    return render_template('index.html', config=config)
