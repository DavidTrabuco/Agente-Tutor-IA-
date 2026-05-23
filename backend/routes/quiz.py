import json
import os
import requests
from flask import Blueprint, request, jsonify
from services.tutor_logic import get_adaptive_prompt

quiz_bp = Blueprint('quiz', __name__)

API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = os.getenv("OPENROUTER_API_URL", "https://openrouter.ai/api/v1/chat/completions")

QUIZ_SYSTEM_PROMPT = """Você é um gerador de questões acadêmicas de computação.
Seu objetivo é criar UMA questão de múltipla escolha baseada no nível e interesse do aluno.

Formato de resposta obrigatório (JSON puro):
{{
  "question": "Texto da pergunta",
  "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "correct_index": 0,
  "explanation": "Explicação curta do porquê está correta"
}}

Contexto do Aluno:
{profile_context}
Matéria: {subject}
Dificuldade Atual: {difficulty}
"""

@quiz_bp.route("/generate-question", methods=["POST"])
def generate_question():
    body = request.get_json()
    subject = body.get("subject", "Algoritmos")
    user_id = body.get("user_id")
    
    # Carregar perfil do usuário para adaptar a questão
    user_data = {}
    try:
        with open('database/progress.json', 'r') as f:
            db = json.load(f)
            user_data = db.get(str(user_id), {})
    except: pass

    difficulty = "fácil"
    xp = user_data.get('xp', 0)
    if xp > 1000: difficulty = "média"
    if xp > 3000: difficulty = "difícil"

    prompt = QUIZ_SYSTEM_PROMPT.format(
        profile_context=json.dumps(user_data),
        subject=subject,
        difficulty=difficulty
    )

    try:
        response = requests.post(
            API_URL,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {API_KEY}",
            },
            json={
                "model": "anthropic/claude-3-haiku",
                "messages": [{"role": "system", "content": prompt}],
                "response_format": { "type": "json_object" }
            },
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        question_data = json.loads(data["choices"][0]["message"]["content"])
        return jsonify(question_data)
    except Exception as e:
        print(f"Erro na API real: {e}. Usando mock fallback.")
        # Mock Fallback caso a API falhe ou a chave seja inválida
        mock_questions = {
            "Algoritmos": {
                "question": "O que é um algoritmo?",
                "options": ["A) Um hardware", "B) Uma sequência finita de instruções", "C) Um tipo de monitor", "D) Uma linguagem de programação"],
                "correct_index": 1,
                "explanation": "Um algoritmo é uma sequência lógica e finita de passos para resolver um problema."
            },
            "IA": {
                "question": "O que caracteriza o Machine Learning?",
                "options": ["A) Programação explícita", "B) Aprendizado através de dados", "C) Uso de apenas IF/ELSE", "D) É um sinônimo de hardware"],
                "correct_index": 1,
                "explanation": "Machine Learning permite que sistemas aprendam padrões a partir de dados sem serem explicitamente programados."
            }
        }
        return jsonify(mock_questions.get(subject, mock_questions["Algoritmos"]))

@quiz_bp.route("/submit-answer", methods=["POST"])
def submit_answer():
    body = request.get_json()
    user_id = str(body.get("user_id"))
    is_correct = body.get("correct")
    subject_name = body.get("subject")

    try:
        with open('database/progress.json', 'r') as f:
            db = json.load(f)
        
        user_data = db.get(user_id, {})
        
        # Lógica de XP
        xp_gain = 50 if is_correct else 10
        user_data['xp'] = user_data.get('xp', 0) + xp_gain
        
        # Atualizar progresso na matéria
        subjects = user_data.get('subjects', [])
        found = False
        for s in subjects:
            if s['name'] == subject_name:
                s['percent'] = min(100, s.get('percent', 0) + (5 if is_correct else 1))
                found = True
                break
        if not found:
            subjects.append({"name": subject_name, "percent": 5 if is_correct else 1})
        
        user_data['subjects'] = subjects
        db[user_id] = user_data

        with open('database/progress.json', 'w') as f:
            json.dump(db, f, indent=2)

        return jsonify({"status": "success", "new_xp": user_data['xp']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
