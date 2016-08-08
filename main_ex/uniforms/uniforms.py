from copy import deepcopy

_DATA = [
    {
        'id': 0,
        'name': 'Shirts',
        'description': 'Human advertisement devices',
        'products_list': [
            {
                'id': 0,
                'name': 'Undershirt',
                'price': 50,
                'amount': 10,
                'description': 'The teasingly thin cotton shirt usually seen worn by usually hot-the-ones-you-fancy '
                               'footballers underneath their jerseys'
            },
            {
                'id': 1,
                'name': 'A Uniform Top',
                'price': 120,
                'amount': 20,
                'description': 'Clothing that makes you free of judgements based on clothing by being constricting, '
                               'uncomfortable and generally ugly'
            }
        ]
    },
    {
        'id': 1,
        'name': 'Trousers',
        'description': 'You wear them on your legs',
        'products_list': [
            {
                'id': 0,
                'name': 'B Uniform Trousers',
                'price': 60,
                'amount': 8,
                'description': 'An over-worn piece of clothing that has taken over the army'
            }
        ]
    }
]


def get_departments():
    """
    Get a list of all available departments.

    :return: A list of all available departments.
    """
    departments_list = []
    for department in _DATA:
        department_copy = deepcopy(department)
        department_copy.pop('products_list')
        departments_list.append(department_copy)
    return departments_list


def get_products(department_id):
    """
    Get a list of all available products in the given department.

    :param department_id: The department ID.
    :return: The department's products list, or None if an error occurred.
    """
    max_department_id = len(_DATA) - 1
    # Validate department ID.
    if not isinstance(department_id, int) or department_id < 0 or department_id > max_department_id:
        raise ValueError('Please give a proper department ID! (0-{})'.format(max_department_id))
    return deepcopy(_DATA[department_id]['products_list'])


def buy_product(department_id, product_id, amount=1):
    """
    Reduce the available amount of the given product (in the given department) by the given amount.

    :param department_id: The department ID.
    :param product_id: The product ID.
    :param amount: The amount of products to buy.
    :return: The new product JSON, or None if an error occurred.
    """
    max_department_id = len(_DATA) - 1
    # Validate department ID.
    if not isinstance(department_id, int) or department_id < 0 or department_id > max_department_id:
        raise ValueError('Please give a proper department ID! (0-{})'.format(max_department_id))
    products_list = _DATA[department_id]['products_list']
    max_product_id = len(products_list) - 1
    # Validate product ID.
    if not isinstance(product_id, int) or product_id < 0 or product_id > max_product_id:
        raise ValueError('Please give a proper department ID! (0-{})'.format(max_department_id))
    product = products_list[product_id]
    max_product_amount = product['amount']
    # Validate amount.
    if not isinstance(amount, int) or amount <= 0 or amount > max_product_amount:
        raise ValueError('Please give a proper amount to buy! (1-{})'.format(max_product_amount))
    product['amount'] -= amount
    return deepcopy(product)


__all__ = ['get_departments', 'get_products', 'buy_product']
