import json
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

USERS_FILE = 'database/users.json'

def load_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@auth_bp.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    users = load_users()
    user = next((u for u in users if u["email"] == email and u["password"] == password), None)

    if not user:
        return jsonify({"error": "E-mail ou senha inválidos"}), 401

    user_without_password = {k: v for k, v in user.items() if k != "password"}
    return jsonify(user_without_password)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    email = body.get("email")

    users = load_users()

    if any(u["email"] == email for u in users):
        return jsonify({"error": "E-mail já cadastrado"}), 409

    new_user = {
        "id": len(users) + 1,
        "email": email,
        "password": body.get("password"),
        "name": body.get("name"),
        "onboarded": False,
        "xp": 0,
        "level": 1,
        "streak": 0
    }

    users.append(new_user)
    save_users(users)

    user_without_password = {k: v for k, v in new_user.items() if k != "password"}
    return jsonify(user_without_password)
