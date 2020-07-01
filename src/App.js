import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './components/Home/Home'
import PrivateRouter from './hoc/PrivateRouter'
import React from 'react'
import TokenValidator from './containers/TokenValidator/TokenValidation'
import { connect } from 'react-redux'
import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${(props) => (props.primary ? 'orange' : 'grey')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  line-height: 31px;
  cursor: pointer;
`

const App = (props) => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/token" component={TokenValidator} />
        <PrivateRouter path="/repo" token={props.token} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </div>
)

const mapStateToProps = (state) => {
  return {
    token: state.tokenValidator.token,
  }
}

export default connect(mapStateToProps)(App)
