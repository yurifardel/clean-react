import React, { useState } from 'react'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './signup-styles.scss'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'campo obrigatorio',
    emailError: 'campo obrigatorio',
    passwordError: 'campo obrigatorio',
    passwordConfirmationError: 'campo obrigatorio',
    mainError: ''
  })
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className={Styles.form} action="">
          <h2>Cadastre sua conta</h2>
          <Input type="text" name="name" placeholder="digite seu nome"/>
          <Input type="email" name="email" placeholder="digite seu email"/>
          <Input type="password" name="password" placeholder="digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="confirme sua passsword"/>
          <button data-testid='submit' className={Styles.submit} disabled type="submit">Entrar</button>
          <span className={Styles.link}>Voltar para o login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup