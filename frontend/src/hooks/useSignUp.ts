import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useLogin"

interface SignUpErrors {
  name: string
  email: string
  password: string
}

export default function useSignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<SignUpErrors>({ name: '', email: '', password: '' })
  const { signup } = useAuth()
  const navigate = useNavigate()

  const validar = (): boolean => {
    const next: SignUpErrors = { name: '', email: '', password: '' }
    let valido = true

    if (!name || name.trim().length < 2) {
      next.name = 'Nome deve ter ao menos 2 caracteres.'
      valido = false
    }

    if (!email) {
      next.email = 'E-mail obrigatorio.'
      valido = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'E-mail invalido.'
      valido = false
    }

    if (!password) {
      next.password = 'Senha obrigatoria.'
      valido = false
    } else if (password.length < 6) {
      next.password = 'A senha deve ter ao menos 6 caracteres.'
      valido = false
    }

    setErrors(next)
    return valido
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    const success = await signup({ name, email, password })
    if (!success) {
      setErrors(prev => ({ ...prev, email: 'Erro ao criar conta. Tente novamente.' }))
    } else {
      navigate('/questionario')
    }
  }

  return { name, setName, email, setEmail, password, setPassword, errors, handleSubmit }
}