from app import db, create_app
from app.models import Customer, Product

app = create_app()
with app.app_context():
    db.session.add_all([
        Customer(customer_id='CUST001', name='John Doe', pan='AAAPL1234C'),
        Customer(customer_id='CUST002', name='Jane Smith', pan='AAAPL5678D'),
        Product(product_name='Product1', description='A great product', annual_cost=500.0),
        Product(product_name='Product2', description='Another great product', annual_cost=1000.0)
    ])
    db.session.commit()
