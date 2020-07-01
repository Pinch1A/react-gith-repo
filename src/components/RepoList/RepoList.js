import { Button } from '../../App'
import React from 'react'
import { Repo } from '../index'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
`
const ButtonWrapper = styled(Flex)`
  justify-content: center;
`
const StyledList = styled(Flex)`
  flex-direction: column;
  border: 1px solid #ccc;
  margin: 10px 0;
`

const RepoList = ({ pageInfo, fetchMoreRepo, repos }) => {
  return (
    <>
      <StyledList>
        {repos.map(({ node }, index) => (
          <Repo key={`${node.id}-${index}`} repository={node} />
        ))}
      </StyledList>
      <ButtonWrapper>
        {pageInfo && pageInfo.hasNextPage ? (
          <Button primary onClick={fetchMoreRepo}>
            Load More
          </Button>
        ) : (
          repos.length > 0 && (
            <Button href="#top">No more results,Go To Top</Button>
          )
        )}
      </ButtonWrapper>
    </>
  )
}

export default RepoList
