import { Redirect, Route } from 'react-router'
import React from 'react'
import ReposPage from '../containers/ReposPage/ReposPage'

const PrivateRoute = (props) => {
  return (
    <Route
      {...props}
      render={(innerProps) => {
        return props.token ? (
          <ReposPage {...innerProps} />
        ) : (
          <Redirect to="/token" />
        )
      }}
    />
  )
}
export default PrivateRoute
