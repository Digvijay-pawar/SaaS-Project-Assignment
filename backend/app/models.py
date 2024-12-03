from . import db

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    pan = db.Column(db.String(10), unique=True)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    annual_cost = db.Column(db.Float, nullable=False)

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.String(50), db.ForeignKey('customer.customer_id'), nullable=False)
    product_name = db.Column(db.String(100), db.ForeignKey('product.product_name'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    no_of_users = db.Column(db.Integer, nullable=False)
