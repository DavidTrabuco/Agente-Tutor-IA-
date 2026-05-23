import json
from flask import Blueprint, request, jsonify

sync_bp = Blueprint('sync', __name__)

@sync_bp.route("/sync-user", methods=["POST"])
def sync_user():
    user_data = request.get_json()
    user_id = str(user_data.get('id'))
    
    try:
        # Carregar DB de progresso/perfil
        db = {}
        if (open('database/progress.json', 'r')):
            with open('database/progress.json', 'r') as f:
                db = json.load(f)
        
        # Atualizar ou criar perfil
        db[user_id] = user_data
        
        with open('database/progress.json', 'w') as f:
            json.dump(db, f, indent=2)
            
        return jsonify({"status": "success"})
    except Exception as e:
        # Se o arquivo não existir, criar um novo
        try:
            db = {user_id: user_data}
            with open('database/progress.json', 'w') as f:
                json.dump(db, f, indent=2)
            return jsonify({"status": "success"})
        except:
            return jsonify({"error": str(e)}), 500
