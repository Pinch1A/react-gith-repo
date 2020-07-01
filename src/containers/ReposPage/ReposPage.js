import * as actions from '../../store/actions/index'
import React, { useEffect, useState } from 'react'
import { RepoList, SearchForm, Spinner } from '../../components'
import { GET_ORGANIZATION } from '../../api/gitV4'
import { connect } from 'react-redux'
import styled from 'styled-components'

const RepoPage = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ReposPage = ({
  repos,
  token,
  loading,
  repoSearch,
  pageInfo,
  error,
  clearSearch,
}) => {
  const [repoName, setRepoName] = useState('')

  useEffect(() => {
    const queryString = `is:public ${repoName} in:name`
    clearSearch()
    repoSearch(GET_ORGANIZATION(queryString), token)
  }, [clearSearch, repoName, repoSearch, token])

  const handleForm = (e) => {
    e.preventDefault()
    const queryString = `is:public ${repoName} in:name`
    clearSearch()
    repoSearch(GET_ORGANIZATION(queryString), token)
  }
  const inputChangeHandler = (target) => {
    // event.preventDefault()
    setRepoName(target)
  }

  const fetchMoreRepo = () => {
    let { endCursor } = pageInfo
    let queryString = `is:public ${repoName} in:name`
    return repoSearch(GET_ORGANIZATION(queryString, endCursor), token)
  }

  return (
    <RepoPage id="top">
      {error ? (
        <p> {error.message} </p>
      ) : (
        <div>
          <SearchForm
            handleForm={handleForm}
            searchString={repoName}
            onChange={inputChangeHandler}
            clearSearch={clearSearch}
          />
          <p className="searchCount">
            Search Result: Total {repos ? repos.length : 0} Repository
          </p>
          {repos && !loading && (
            <RepoList
              repos={repos}
              fetchMoreRepo={fetchMoreRepo}
              pageInfo={pageInfo}
            />
          )}
          {loading && <Spinner />}
        </div>
      )}
    </RepoPage>
  )
}

const mapStateToProps = (state) => {
  return {
    repos: state.repoReducer.repos,
    loading: state.repoReducer.loading,
    error: state.repoReducer.error,
    token: state.tokenValidator.token,
    pageInfo: state.repoReducer.pageInfo,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    repoSearch: (query, token) => actions.repoSearch(query, token)(dispatch),
    clearSearch: () => dispatch(actions.clearSearch()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReposPage)
