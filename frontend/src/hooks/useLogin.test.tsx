import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useLoginForm } from './useLogin'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('useLoginForm — validação', () => {
  it('deve exigir e-mail quando o campo está vazio', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper })

    await act(async () => {
      await result.current.handleSubmit(
        { preventDefault: () => {} } as React.FormEvent,
        () => {}
      )
    })

    expect(result.current.errors.email).toBe('E-mail obrigatorio.')
  })

  it('deve rejeitar e-mail com formato inválido', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper })

    act(() => { result.current.setEmail('emailsemarroba') })

    await act(async () => {
      await result.current.handleSubmit(
        { preventDefault: () => {} } as React.FormEvent,
        () => {}
      )
    })

    expect(result.current.errors.email).toBe('E-mail invalido.')
  })

  it('deve exigir senha quando o campo está vazio', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper })

    act(() => { result.current.setEmail('joao@email.com') })

    await act(async () => {
      await result.current.handleSubmit(
        { preventDefault: () => {} } as React.FormEvent,
        () => {}
      )
    })

    expect(result.current.errors.password).toBe('Senha obrigatoria.')
  })

  it('deve rejeitar senha com menos de 6 caracteres', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper })

    act(() => {
      result.current.setEmail('joao@email.com')
      result.current.setPassword('123')
    })

    await act(async () => {
      await result.current.handleSubmit(
        { preventDefault: () => {} } as React.FormEvent,
        () => {}
      )
    })

    expect(result.current.errors.password).toBe('A senha deve ter ao menos 6 caracteres.')
  })
})
