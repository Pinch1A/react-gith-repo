import * as actions from '../../store/actions/index'
import React, { useEffect, useState } from 'react'
import { Button } from '../../App'
import { connect } from 'react-redux'

import styled from 'styled-components'

const TokenPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`
const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  font-size: 1.5rem;
`

export const Title = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`
const TextField = styled.input`
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 1rem;
  width: 30rem;
  margin-bottom: 2rem;
  margin: 20px 0;
`
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`

const Error = styled.h4`
  color: salmon;
  font-size: 2rem;
`

const TokenValidator = ({
  tokenValidator,
  error,
  history,
  token: existingToken,
}) => {
  const [token, setToken] = useState(existingToken)
  const [errorMessage, setErrorMessage] = useState(
    error ? error.message : undefined
  )

  const handleForm = (e) => {
    e.preventDefault()
    tokenValidator({ token, history: history })
  }
  const inputChangeHandler = (e) => {
    setToken(e.target.value)
  }
  const handleFormWithEnv = () => {
    tokenValidator({
      token: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
      history: history,
    })
  }

  useEffect(() => {
    if (error === 'INVALID') setErrorMessage('Token is InValid')
  }, [error, errorMessage])

  return (
    <TokenPage>
      <Header>
        <Title>Token Validator</Title>
        <p>
          Before Proceeding further please validate your token. To generate
          token and find more info refer{' '}
          <a
            rel="noopener noreferrer"
            href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-tokens"
            target="_blank"
          >
            <u>docs</u>
          </a>
          .
        </p>
      </Header>

      <Button primary onClick={handleFormWithEnv}>
        USE ENVIRONMENT VAR
      </Button>
      <FormWrapper autoComplete="off" onSubmit={handleForm}>
        <TextField
          type="text"
          name="token"
          onChange={inputChangeHandler}
          placeholder="Enter your token here....."
        />
        {errorMessage && <Error>{errorMessage}</Error>}
      </FormWrapper>
    </TokenPage>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenValidator.token,
    loading: state.tokenValidator.loading,
    error: state.tokenValidator.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    tokenValidator: ({ token, history }) =>
      actions.tokenValidator({ token, history })(dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenValidator)
