from flask import Blueprint, request, jsonify
from .models import db, Customer, Product, Subscription
import datetime

bp = Blueprint('api', __name__)

@bp.route('/', methods=['GET'])
def home_route():
    message =  "BACKEND IS WERKING PROPERLY..."
    return jsonify(message), 200

@bp.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    customers_list = [
        {"customer_id": c.customer_id, "name": c.name, "pan": c.pan}
        for c in customers
    ]
    return jsonify(customers_list), 200

@bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    product_list = [
        {"product_id": p.id, "product_name": p.product_name, "annual_cost": p.annual_cost}
        for p in products
    ]
    return jsonify(product_list), 200

@bp.route('/subscriptions', methods=['GET'])
def get_subscriptions():
    subscriptions = Subscription.query.all()
    subscriptions_list = [
        {
            "subscription_id": s.id,
            "customer_id": s.customer_id,
            "product_name": s.product_name,
            "start_date": s.start_date.strftime("%Y-%m-%d"),
            "end_date": s.end_date.strftime("%Y-%m-%d"),
            "no_of_users": s.no_of_users
        }
        for s in subscriptions
    ]
    return jsonify(subscriptions_list), 200


from datetime import datetime
@bp.route('/subscriptions', methods=['POST'])
def add_subscription():
    data = request.json
    try:
        # Convert start_date and end_date to Python date objects
        start_date = datetime.strptime(data['start_date'], "%Y-%m-%d").date()
        end_date = datetime.strptime(data['end_date'], "%Y-%m-%d").date()
        
        # Check for existing subscription
        existing = Subscription.query.filter(
            Subscription.customer_id == data['customer_id'],
            Subscription.product_name == data['product_name'],
            Subscription.end_date >= start_date
        ).first()
        if existing:
            return jsonify({"error": "Active subscription exists"}), 400

        # Create a new subscription
        subscription = Subscription(
            customer_id=data['customer_id'],
            product_name=data['product_name'],
            start_date=start_date,
            end_date=end_date,
            no_of_users=data['no_of_users']
        )
        db.session.add(subscription)
        db.session.commit()
        return jsonify({"message": "Subscription added"}), 201

    except KeyError as e:
        return jsonify({"error": f"Missing key: {str(e)}"}), 400
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/subscriptions/<int:id>', methods=['PATCH'])
def extend_subscription(id):
    data = request.json
    subscription = Subscription.query.get_or_404(id)
    
    try:
        # Ensure the end_date is converted to a Python date object
        new_end_date = datetime.strptime(data['end_date'], "%Y-%m-%d").date()
        subscription.end_date = new_end_date
        db.session.commit()
        return jsonify({"message": "Subscription extended"}), 200
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400


from datetime import date
@bp.route('/subscriptions/<int:id>/end', methods=['DELETE'])
def end_subscription(id):
    subscription = Subscription.query.get_or_404(id)
    
    # Correctly call today() on the date class
    subscription.end_date = date.today()
    db.session.commit()
    return jsonify({"message": "Subscription ended"}), 200


@bp.route('/revenue', methods=['GET'])
def get_revenue():
    subscriptions = Subscription.query.all()
    revenue = sum(
        s.no_of_users * Product.query.filter_by(product_name=s.product_name).first().annual_cost
        for s in subscriptions
    )
    return jsonify({"revenue": revenue}), 200
