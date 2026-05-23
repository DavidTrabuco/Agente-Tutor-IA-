def get_adaptive_prompt(user_progress):
    xp = user_progress.get('xp', 0)
    difficulties = user_progress.get('difficulties', [])
    interests = user_progress.get('interests', [])
    
    level = "iniciante"
    if xp > 1000:
        level = "intermediário"
    if xp > 5000:
        level = "avançado"
        
    difficulty_context = ""
    if difficulties:
        difficulty_context = f"O aluno tem dificuldades em: {', '.join(difficulties)}."

    # Especialização do Tutor
    specialization = "Computação Geral"
    if "Backend" in interests: specialization = "Especialista em Backend e APIs"
    elif "Inteligência Artificial" in interests: specialization = "Especialista em IA e Machine Learning"
    elif "Frontend" in interests: specialization = "Especialista em Frontend e UX"
    elif "Cibersegurança" in interests: specialization = "Especialista em Segurança e Criptografia"
    elif "Games" in interests: specialization = "Especialista em Game Design e Motores de Jogo"

    return f"""Sua especialidade agora: {specialization}.
Nível do aluno: {level}.
{difficulty_context}
Se o aluno demonstrar facilidade, aumente gradualmente a complexidade.
Se o aluno errar conceitos básicos, simplifique a explicação e use analogias.
Sempre que possível, traga exemplos práticos alinhados com os interesses do aluno: {', '.join(interests)}."""
