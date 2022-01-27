import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Signup } from '@/presentation/pages'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (Factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={Factory.makeLogin}/>
        <Route path='/signup' exact component={Factory.makeSignup}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router