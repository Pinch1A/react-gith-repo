import React from 'react'

import styled from 'styled-components'

const Row = styled.div`
  padding: 5px 0;
`
const Column = styled.div`
  display: flex;
  padding: 2px;
  justify-content: space-between;
`
const Cell = styled.div`
  display: flex;
  padding: 2px;
`

const Stars = styled(Cell)`
  color: red;
  font-weight: 800;
`

const StyledDesc = styled(Cell)`
  font-size: 14px;
  color: grey;
  max-width: 400px;
`

const Repo = ({
  repository: {
    name,
    description,
    stargazers: { totalCount },
    url,
  },
}) => {
  return (
    <Row>
      <Column>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Cell>{name}</Cell>
        </a>
        <Stars>{totalCount}</Stars>
      </Column>
      <div>
        <StyledDesc>{description}</StyledDesc>
      </div>
    </Row>
  )
}

export default Repo
