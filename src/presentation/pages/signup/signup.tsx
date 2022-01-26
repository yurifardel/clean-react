import React, { useEffect, useState } from 'react'
import { Footer, Input, Header, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './signup-styles.scss'
import { Validation } from '../protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (
        state.isLoading ||
        state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmationError
      ) {
        return
      }
      setState({ ...state, isLoading: true })
      const createAccount = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(createAccount.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Cadastre sua conta</h2>
          <Input type="text" name="name" placeholder="digite seu nome"/>
          <Input type="email" name="email" placeholder="digite seu email"/>
          <Input type="password" name="password" placeholder="digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="confirme sua passsword"/>
          <button data-testid='submit' className={Styles.submit} disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError } type="submit">Entrar</button>
          <Link data-testid='login-link' replace to='/login' className={Styles.link}>Voltar para o login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup