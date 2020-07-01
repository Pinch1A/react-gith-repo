import * as actionTypes from '../actions/actionTypes'
import { orderBy } from 'lodash'

export const initialState = {
  repos: undefined,
  pageInfo: null,
  loading: false,
  error: null,
}
const repoReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.REPO_SEARCH_START:
      return { ...state, loading: true, error: null }
    case actionTypes.REPO_SEARCH_SUCCESS:
      const oldState = state.repos ? [...state.repos] : []
      const reposList = [...oldState, ...actions.repos.edges]
      return {
        ...state,
        repos: orderBy(reposList, 'node.stargazers.totalCount', ['desc']),
        pageInfo: actions.repos.pageInfo,
        error: null,
        loading: false,
      }
    case actionTypes.REPO_SEARCH_FAIL:
      return {
        ...state,
        error: actions.error,
        loading: false,
        repos: undefined,
      }
    case actionTypes.CLEAR_SEARCH:
      return {
        ...state,
        repos: undefined,
        pageInfo: null,
      }
    case actionTypes.REPO_SEARCH_NO_RESULT:
      return {
        ...state,
        repos: undefined,
        loading: false,
      }
    default:
      return state
  }
}
export default repoReducer
