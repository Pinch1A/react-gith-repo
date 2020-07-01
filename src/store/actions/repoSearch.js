import * as actionTypes from './actionTypes'
import axios from 'axios'

export const repoSearchStart = () => {
  return {
    type: actionTypes.REPO_SEARCH_START,
  }
}

export const repoSearchSuccess = (repos) => {
  return {
    type: actionTypes.REPO_SEARCH_SUCCESS,
    repos,
  }
}

export const repoSearchWithNoResult = (repos) => {
  return {
    type: actionTypes.REPO_SEARCH_NO_RESULT,
    repos,
  }
}

export const repoSearchFail = (error) => {
  return {
    type: actionTypes.REPO_SEARCH_FAIL,
    error,
  }
}

export const clearSearch = () => {
  return {
    type: actionTypes.CLEAR_SEARCH,
    repos: [],
  }
}

export const repoSearch = (query, token, cursor) => (dispatch) => {
  dispatch(repoSearchStart())
  return axios
    .post(
      `https://api.github.com/graphql`,
      {
        query,
        variables: { cursor },
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.data.data.search.edges.length === 0)
        dispatch(repoSearchWithNoResult(res.data.data.search))
      else dispatch(repoSearchSuccess(res.data.data.search))
    })
    .catch((error) => {
      dispatch(repoSearchFail(error))
    })
}
