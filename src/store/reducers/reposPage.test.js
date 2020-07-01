import * as actionTypes from '../actions/actionTypes'
import repoReducer, { initialState } from './reposPage'
import expect from 'expect'
import { repos } from '../mocks/repoMock'

describe('reposPage reducer', () => {
  it('should return the initial state', () => {
    expect(repoReducer(undefined, {})).toEqual(initialState)
  })
  it('trigger action REPO_SEARCH_START and returns updated state', () => {
    const actions = { type: actionTypes.REPO_SEARCH_START }
    const expectedState = { ...initialState, loading: true }
    expect(repoReducer(undefined, actions)).toEqual(expectedState)
  })
  it('trigger action REPO_SEARCH_SUCCESS and ...', () => {
    const actions = {
      type: actionTypes.REPO_SEARCH_SUCCESS,
      repos: {
        pageInfo: {},
        edges: repos,
      },
    }
    const expectedState = {
      ...initialState,
      pageInfo: actions.repos.pageInfo,
      repos: actions.repos.edges,
    }
    expect(repoReducer(undefined, actions)).toEqual(expectedState)
  })
  it('trigger action REPO_SEARCH_FAIL and returns updated state', () => {
    const actions = {
      type: actionTypes.REPO_SEARCH_FAIL,
      error: 'Search Failure',
    }
    const expectedState = { ...initialState, error: actions.error }
    expect(repoReducer(undefined, actions)).toEqual(expectedState)
  })
  it('trigger action CLEAR_SEARCH and returns initial state', () => {
    const actions = { type: actionTypes.CLEAR_SEARCH }
    expect(repoReducer(undefined, actions)).toEqual(initialState)
  })
  it('trigger action REPO_SEARCH_NO_RESULT and returns initial state', () => {
    const actions = { type: actionTypes.REPO_SEARCH_NO_RESULT }
    expect(repoReducer(undefined, actions)).toEqual(initialState)
  })
})
