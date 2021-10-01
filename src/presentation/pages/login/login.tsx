import React from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Logo from '@/presentation/components/logo/logo'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        < Logo/>
        <h1>$Dev</h1>
      </header>
      <form className={Styles.form} action="">
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="digite seu email" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="digite sua senha" />
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login