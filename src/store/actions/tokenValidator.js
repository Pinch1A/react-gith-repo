import * as actionTypes from './actionTypes'
import axios from 'axios'

export const tokenValidStart = () => {
  return {
    type: actionTypes.START_TOKEN_VALIDATION,
  }
}

export const tokenValidSuccess = () => {
  return {
    type: actionTypes.TOKEN_VALIDATION_SUCCESS,
  }
}

export const tokenValidationFail = (err) => {
  return {
    type: actionTypes.TOKEN_VALIDATION_FAIL,
    err: err,
  }
}

export const tokenInvalid = () => {
  return {
    type: actionTypes.TOKEN_INVALID,
  }
}

export const tokenSetter = (token) => {
  return {
    type: actionTypes.TOKEN_SETTER,
    token,
  }
}

export const tokenValidator = ({ token, history }) => (dispatch) => {
  dispatch(tokenValidStart())
  const query = `{
            rateLimit {
                remaining
        }
    }`
  return axios
    .post(
      `https://api.github.com/graphql`,
      {
        query: query,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(tokenValidSuccess())
      if (res.status === 200) {
        dispatch(tokenSetter(token))
        history.push('/repo')
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) dispatch(tokenInvalid())
      else dispatch(tokenValidationFail(err))
    })
}
