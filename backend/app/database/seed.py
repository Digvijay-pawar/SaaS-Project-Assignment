import sys
from pathlib import Path
# Add the root directory to the Python path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

from app import db, create_app
from app.models import Customer, Product

app = create_app()
with app.app_context():
    db.session.add_all([
        Customer(customer_id='CUST001', name='Digvijay Pawar', pan='AAAPL1234C'),
        Customer(customer_id='CUST002', name='Lokesh Patil', pan='AAAPL5678D'),
        Customer(customer_id='CUST003', name='Rahul Singh', pan='AAAPL9101E'),
        Customer(customer_id='CUST004', name='Sachin Sharma', pan='AAAPL1121F'),
        Product(product_name='Product1', description='A great product', annual_cost=500.0),
        Product(product_name='Product2', description='Another great product', annual_cost=1000.0)
    ])
    db.session.commit()
