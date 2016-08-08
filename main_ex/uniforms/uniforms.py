from copy import deepcopy

# The department documents.
_DEPARTMENTS_DATA = [
    {
        'id': 0,
        'name': 'Shirts',
        'description': 'Human advertisement devices'
    },
    {
        'id': 1,
        'name': 'Trousers',
        'description': 'You wear them on your legs'
    }
]

# The product documents.
_PRODUCTS_DATA = [
    {
        'id': 0,
        'department_id': 0,
        'name': 'Undershirt',
        'price': 50,
        'amount': 10,
        'description': 'A teasingly thin cotton shirt'
    },
    {
        'id': 1,
        'department_id': 0,
        'name': 'A Uniform Top',
        'price': 120,
        'amount': 20,
        'description': 'Clothing that makes you free of judgements based on clothing by being constricting, '
                       'uncomfortable and generally ugly',
        'similar_products': [3]
    },
    {
        'id': 2,
        'department_id': 1,
        'name': 'B Uniform Trousers',
        'price': 60,
        'amount': 8,
        'description': 'An over-worn piece of clothing'
    },
    {
        'id': 3,
        'department_id': 1,
        'name': 'A Uniform Trousers',
        'price': 100,
        'amount': 18,
        'description': 'A nicer version of the over-worn B trousers',
        'similar_products': [1]
    }
]


def _validate_positive_integer(value, max_limit, include_zero=False):
    """
    Validate that a given value is a positive integer.

    :param value: The value to validate.
    :param max_limit: The maximum limit for the value.
    :param include_zero: Whether or not to include 0 as a valid value.
    :return: True if the value is a positive integer, and False otherwise.
    """
    if isinstance(value, str):
        if not value.isdecimal():
            return False
        value = int(value)
    return isinstance(value, int) and 0 < value <= max_limit and (include_zero or value != 0)


def get_departments():
    """
    Get a list of all available departments.

    :return: A list of all available departments.
    """
    return deepcopy(_DEPARTMENTS_DATA)


def get_products(department_id):
    """
    Get a list of all available products in the given department.

    :param department_id: The department ID.
    :return: The department's products list.
    :raise ValueError: If the department ID is not valid.
    """
    max_department_id = len(_DEPARTMENTS_DATA) - 1
    # Validate department ID.
    if not _validate_positive_integer(department_id, max_department_id, include_zero=False):
        raise ValueError('Please give a proper department ID! (0-{})'.format(max_department_id))
    return deepcopy([product for product in _PRODUCTS_DATA if product['department_id'] == department_id])


def get_product(product_id):
    """
    Get full product details.

    :param product_id: The product ID.
    :return: The product details JSON.
    :raise ValueError: If the product ID is not valid.
    """
    max_product_id = len(_DEPARTMENTS_DATA) - 1
    # Validate product ID.
    if not _validate_positive_integer(product_id, max_product_id, include_zero=False):
        raise ValueError('Please give a proper product ID! (0-{})'.format(max_product_id))
    return deepcopy(_PRODUCTS_DATA[int(product_id)])


def buy_product(product_id, amount=1):
    """
    Reduce the available amount of the given product by the given amount.

    :param product_id: The product ID.
    :param amount: The amount of products to buy.
    :return: The new product JSON, or None if an error occurred.
    :raise ValueError: If the product ID is not not valid.
    """
    max_product_id = len(_PRODUCTS_DATA) - 1
    # Validate product ID.
    if not _validate_positive_integer(product_id, max_product_id, include_zero=False):
        raise ValueError('Please give a proper product ID! (0-{})'.format(max_product_id))
    product = _PRODUCTS_DATA[int(product_id)]
    max_product_amount = product['amount']
    # Validate amount.
    if not _validate_positive_integer(amount, max_product_amount, include_zero=True):
        raise ValueError('Please give a proper amount to buy! (1-{})'.format(max_product_amount))
    product['amount'] -= int(amount)
    return deepcopy(product)


__all__ = ['get_departments', 'get_products', 'get_product', 'buy_product']
