import React from 'react'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './signup-styles.scss'
import { Link } from 'react-router-dom'

const Signup: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form} action="">
          <h2>Cadastre sua conta</h2>
          <Input type="text" name="name" placeholder="digite seu nome"/>
          <Input type="email" name="email" placeholder="digite seu email"/>
          <Input type="password" name="password" placeholder="digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="confirme sua passsword"/>
          <button className={Styles.submit} type="submit">Entrar</button>
          <Link to="/login" className={Styles.link}>Voltar para o login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup