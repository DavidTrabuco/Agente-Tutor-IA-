import os
import requests
import json
from flask import Blueprint, request, jsonify
from services.tutor_logic import get_adaptive_prompt

chat_bp = Blueprint('chat', __name__)
API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = os.getenv("OPENROUTER_API_URL", "https://openrouter.ai/api/v1/chat/completions")

SYSTEM_PROMPT = """Você é um tutor inteligente de computação chamado TutorIA,
desenvolvido para alunos da UNIFACS. Seu comportamento:

- Adapte a linguagem ao nível do aluno (iniciante → avançado)
- Sempre explique com exemplos práticos de código quando relevante
- Se o aluno errar, corrija com gentileza e explique o porquê
- Ao final de cada explicação, faça UMA pergunta para verificar o entendimento
- Matéria atual: {subject}
{adaptive_context}
Responda sempre em português brasileiro."""

@chat_bp.route("/chat", methods=["POST"])
def chat():
    body = request.get_json()
    messages = body.get("messages", [])
    subject = body.get("subject", "Algoritmos")
    user_id = body.get("user_id", "1")
    mode = body.get("mode", "tutor") # 'tutor' ou 'professor'

    # Carregar dados do usuário
    user_data = {}
    try:
        with open('database/progress.json', 'r') as f:
            db = json.load(f)
            user_data = db.get(str(user_id), {})
    except: pass

    adaptive_context = get_adaptive_prompt(user_data)
    
    # Lógica do Modo Professor (Socrático)
    mode_instructions = ""
    if mode == "professor":
        mode_instructions = """
        VOCÊ ESTÁ NO MODO PROFESSOR (MÉTODO SOCRÁTICO):
        - NUNCA dê a resposta diretamente.
        - Faça perguntas que levem o aluno a raciocinar.
        - Dê pistas baseadas na teoria.
        - Se o aluno estiver muito perdido, use uma analogia simples.
        """

    profile_context = f"""
    PERFIL DO ALUNO:
    - Nível: {user_data.get('education_level', 'Superior')}
    - Estilo: {user_data.get('learning_style', 'Prático')}
    - {adaptive_context}
    {mode_instructions}
    """

    system_prompt = SYSTEM_PROMPT.format(subject=subject, adaptive_context=profile_context)

    payload = {
        "model": "anthropic/claude-3-haiku",
        "max_tokens": 1000,
        "messages": [
            {"role": "system", "content": system_prompt},
            *messages,
        ],
    }

    try:
        response = requests.post(
            API_URL,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {API_KEY}",
            },
            json=payload,
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        assistant_text = data["choices"][0]["message"]["content"]
        return jsonify({"message": assistant_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
