import json
from flask import Blueprint, jsonify

progress_bp = Blueprint('progress', __name__)

@progress_bp.route("/progress/<user_id>", methods=["GET"])
def get_progress(user_id):
    try:
        with open('database/progress.json', 'r') as f:
            db = json.load(f)
            return jsonify(db.get(str(user_id), {}))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
