import * as actionTypes from '../actions/actionTypes'
import tokenReducer, { initialState } from './tokenValidator'
import expect from 'expect'

describe('tokenValidator reducer', () => {
  it('should return the initial state', () => {
    expect(tokenReducer(undefined, {})).toEqual(initialState)
  })
  it('trigger action START_TOKEN_VALIDATION and returns updated state', () => {
    const actions = { type: actionTypes.START_TOKEN_VALIDATION }
    const expectedState = { ...initialState, loading: true }
    expect(tokenReducer(undefined, actions)).toEqual(expectedState)
  })
  it('trigger action TOKEN_VALIDATION_SUCCESS and returns initial state', () => {
    const actions = { type: actionTypes.TOKEN_VALIDATION_SUCCESS }
    expect(tokenReducer(undefined, actions)).toEqual(initialState)
  })
  it('trigger action TOKEN_VALIDATION_FAIL and returns updated state', () => {
    const actions = {
      type: actionTypes.TOKEN_VALIDATION_FAIL,
      err: 'Validation failed',
    }
    const expectedState = { ...initialState, token: null, error: actions.err }
    expect(tokenReducer(undefined, actions)).toEqual(expectedState)
  })
  it('trigger action TOKEN_INVALID and returns updated state', () => {
    const actions = { type: actionTypes.TOKEN_INVALID }
    const expectedState = { ...initialState, token: null, error: 'INVALID' }
    expect(tokenReducer(undefined, actions)).toEqual(expectedState)
  })
  it('trigger action TOKEN_SETTER and returns updated state', () => {
    const actions = { type: actionTypes.TOKEN_SETTER, token: 'validated token' }
    const expectedState = { ...initialState, token: actions.token }
    expect(tokenReducer(undefined, actions)).toEqual(expectedState)
  })
})
