from flask import Blueprint, request, jsonify
import requests

user_service_bp = Blueprint('user_service', __name__)

user_service_url = "http://127.0.0.1:8082"

@user_service_bp.route('/auth/signup', methods=['POST'])
def create_user():
    response = requests.post(f"{user_service_url}/auth/signup", json=request.json)
    return jsonify(response.json()), response.status_code

@user_service_bp.route('/auth/login', methods=['POST'])
def login_user():
    login_data = request.json
    print(login_data)
    response = requests.post(f"{user_service_url}/auth/login", json=login_data)
    return jsonify(response.json()), response.status_code