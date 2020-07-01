import * as actions from './repoSearch'
import * as types from './actionTypes'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import { repos } from '../mocks/repoMock'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('repoSearch actions', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions()
  })
  it('should create an action to trigger searching started', () => {
    const expectedAction = {
      type: types.REPO_SEARCH_START,
    }
    expect(actions.repoSearchStart()).toEqual(expectedAction)
  })
  it('should create an action to trigger searching succeded', () => {
    const expectedAction = {
      type: types.REPO_SEARCH_SUCCESS,
      repos,
    }
    expect(actions.repoSearchSuccess(repos)).toEqual(expectedAction)
  })
  it('should create an action to trigger search with no results', () => {
    const expectedAction = {
      type: types.REPO_SEARCH_NO_RESULT,
      repos: [],
    }
    expect(actions.repoSearchWithNoResult([])).toEqual(expectedAction)
  })
  it('should create an action to trigger searching failed', () => {
    const error = { error: { message: 'Test error Message' } }
    const expectedAction = {
      type: types.REPO_SEARCH_FAIL,
      error,
    }
    expect(actions.repoSearchFail(error)).toEqual(expectedAction)
  })
  it('should create an action to trigger clear search query', () => {
    const expectedAction = {
      type: types.CLEAR_SEARCH,
      repos: [],
    }
    expect(actions.clearSearch()).toEqual(expectedAction)
  })
  describe('should create an action make the Graphql request ', () => {
    let mock
    beforeEach(() => {
      mock = jest.spyOn(axios, 'post')
    })
    afterEach(() => {
      mock.mockRestore()
    })
    it('should have success with data', async () => {
      const queryMock = 'query mock'
      const tokenMock = 'token'
      const mockResponse = {
        data: { data: { search: { edges: repos } } },
      }
      mock.mockResolvedValueOnce(mockResponse) // mock axios.post to resolve
      await store.dispatch(actions.repoSearch(queryMock, tokenMock))

      expect(mock).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query: queryMock,
          variables: { cursor: undefined },
        },
        { headers: { Authorization: `bearer ${tokenMock}` } }
      ) // Success!
      const expectedActions = [
        { type: types.REPO_SEARCH_START },
        { type: types.REPO_SEARCH_SUCCESS, repos: { edges: repos } },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
    it('should have success with no data', async () => {
      const queryMock = 'query mock'
      const tokenMock = 'token'
      const mockResponse = {
        data: { data: { search: { edges: [] } } },
      }
      mock.mockResolvedValueOnce(mockResponse) // mock axios.post to resolve
      await store.dispatch(actions.repoSearch(queryMock, tokenMock))

      expect(mock).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query: queryMock,
          variables: { cursor: undefined },
        },
        { headers: { Authorization: `bearer ${tokenMock}` } }
      ) // Success!
      const expectedActions = [
        { type: types.REPO_SEARCH_START },
        { type: types.REPO_SEARCH_NO_RESULT, repos: { edges: [] } },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
    it('should fail and catch the error', async () => {
      const queryMock = 'query mock'
      const tokenMock = 'token'
      const errMsg = { response: 'Network Error' }

      mock.mockImplementationOnce(() => Promise.reject(errMsg)) // mock axios.post to resolve
      await store.dispatch(actions.repoSearch(queryMock, tokenMock))

      expect(mock).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query: queryMock,
          variables: { cursor: undefined },
        },
        { headers: { Authorization: `bearer ${tokenMock}` } }
      ) // Success!
      const expectedActions = [
        { type: types.REPO_SEARCH_START },
        { type: types.REPO_SEARCH_FAIL, error: errMsg },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
