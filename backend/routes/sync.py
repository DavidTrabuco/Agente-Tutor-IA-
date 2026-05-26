import json
from flask import Blueprint, request, jsonify

sync_bp = Blueprint('sync', __name__)

USERS_FILE = 'database/users.json'
PROFILE_FIELDS = {'education_level', 'interests', 'difficulties', 'learning_style', 'goal', 'onboarded'}

@sync_bp.route("/sync-user", methods=["POST"])
def sync_user():
    user_data = request.get_json()
    user_id = int(user_data.get('id'))

    try:
        with open(USERS_FILE, 'r') as f:
            users = json.load(f)

        for u in users:
            if u.get('id') == user_id:
                for field in PROFILE_FIELDS:
                    if field in user_data:
                        u[field] = user_data[field]
                break

        with open(USERS_FILE, 'w') as f:
            json.dump(users, f, indent=2)

        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
