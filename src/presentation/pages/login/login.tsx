import React, { useState, useEffect } from 'react'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '../protocols/validation'
import { Authentication } from '@/domain/usecases'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    password: '',
    email: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        // trava
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState, validation }}>
        <form data-testid='form' className={Styles.form} action="" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="digite seu email"/>
          <Input type="password" name="password" placeholder="digite sua senha" />
          <button data-testid='submit' disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login