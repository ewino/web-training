# Uniforms
### The official uniform store DB package

Holds a list of departments, and a list of product JSONs for each department.  
Each department and product has a unique ID.  

Every department JSON holds the following details:
* ID
* Name
* Description
* Products list

Every product JSON holds the following details:
* ID
* Name
* Price
* Current amount
* Description
* Similar products list (tuples of department and product IDs)

The product image can be found in the images directory, in the file with the matching ID name.  
For example, for the product with ID 30, the image file name will be 30.png.

When given bad input parameters, all functions will raise a ValueError with the relevant reason.

#### Instructions:
* In Python, import the package by running:  
```import uniforms```
* For the full departments list, call:  
```uniforms.get_departments()```
* For the products list of a specific department, call:  
```uniforms.get_products(department_id)```
* In order to buy a product (and reduce its stock by the given amount), call:  
```uniforms.buy_product(department_id, product_id, amount)```

#### Example:

```
import uniforms

departments = uniforms.get_departments()
department_id = departments[0]['id']
products = uniforms.get_products(department_id)
product_id = products[0]['id']
uniforms.buy_product(department_id, product_id, 3)
```
