import * as actions from './tokenValidator'
import * as types from './actionTypes'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import { repos } from '../mocks/repoMock'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('Token Validator actions', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions()
  })
  it('should create an action to start token validation', () => {
    const expectedAction = {
      type: types.START_TOKEN_VALIDATION,
    }
    expect(actions.tokenValidStart()).toEqual(expectedAction)
  })
  it('should create an action to valide token - success', () => {
    const expectedAction = {
      type: types.TOKEN_VALIDATION_SUCCESS,
    }
    expect(actions.tokenValidSuccess()).toEqual(expectedAction)
  })
  it('should create an action to valide token - failure', () => {
    const err = 'Token validation failure'
    const expectedAction = {
      type: types.TOKEN_VALIDATION_FAIL,
      err,
    }
    expect(actions.tokenValidationFail(err)).toEqual(expectedAction)
  })
  it('should create an action to valide token - invalid', () => {
    const expectedAction = {
      type: types.TOKEN_INVALID,
    }
    expect(actions.tokenInvalid()).toEqual(expectedAction)
  })
  it('should create an action to set validated token', () => {
    const token = 'validated token'
    const expectedAction = {
      type: types.TOKEN_SETTER,
      token,
    }
    expect(actions.tokenSetter(token)).toEqual(expectedAction)
  })

  describe('should create an action make the Graphql request ', () => {
    let mock
    beforeEach(() => {
      mock = jest.spyOn(axios, 'post')
    })
    afterEach(() => {
      mock.mockRestore()
    })
    it('should have success and store the token', async () => {
      const history = { push: jest.fn() }
      const query = `{
            rateLimit {
                remaining
        }
    }`
      const tokenMock = 'token'
      const mockResponse = {
        status: 200,
      }
      mock.mockResolvedValueOnce(mockResponse) // mock axios.post to resolve
      await store.dispatch(
        actions.tokenValidator({ token: tokenMock, history })
      )

      expect(mock).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query,
        },
        { headers: { Authorization: `bearer ${tokenMock}` } }
      ) // Success!
      const expectedActions = [
        { type: types.START_TOKEN_VALIDATION },
        { type: types.TOKEN_VALIDATION_SUCCESS },
        { type: types.TOKEN_SETTER, token: tokenMock },
      ]
      expect(store.getActions()).toEqual(expectedActions)
      expect(history.push).toHaveBeenCalledTimes(1)
    })
    it('should fail and catch token invalid', async () => {
      const history = { push: jest.fn() }
      const query = `{
            rateLimit {
                remaining
        }
    }`
      const tokenMock = 'token'
      const errorResponse = {
        response: { status: 401 },
      }
      mock.mockImplementationOnce(() => Promise.reject(errorResponse))
      await store.dispatch(
        actions.tokenValidator({ token: tokenMock, history })
      )

      expect(mock).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query,
        },
        { headers: { Authorization: `bearer ${tokenMock}` } }
      ) // Success!
      const expectedActions = [
        { type: types.START_TOKEN_VALIDATION },
        { type: types.TOKEN_INVALID },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
    it('should fail and catch token validation failure', async () => {
      const history = { push: jest.fn() }
      const query = `{
            rateLimit {
                remaining
        }
    }`
      const tokenMock = 'token'
      const errorResponse = {
        response: { status: 500 },
      }
      mock.mockImplementationOnce(() => Promise.reject(errorResponse))
      await store.dispatch(
        actions.tokenValidator({ token: tokenMock, history })
      )

      expect(mock).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query,
        },
        { headers: { Authorization: `bearer ${tokenMock}` } }
      ) // Success!
      const expectedActions = [
        { type: types.START_TOKEN_VALIDATION },
        { type: types.TOKEN_VALIDATION_FAIL, err: errorResponse },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
