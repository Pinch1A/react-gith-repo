import { Button } from '../../App'
import React from 'react'
import styled from 'styled-components'

const HomePage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`

const Header = styled.header`
  margin-bottom: 4rem;
  text-align: center;
  font-size: 1.5rem;
`

const Title = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

const ListWrapper = styled.div`
  padding: 1rem;
  position: relative;
`
const List = styled.ul`
  padding: 1rem;
`
const ListElem = styled.li`
  margin-bottom: 2rem;
`

export const Home = ({ history }) => {
  const nextPage = () => {
    history.push('/token')
  }
  return (
    <HomePage>
      <Header>
        <Title>GitHub Repo Finder</Title>
        <p>
          A simple application which interact with GitHub API V4 with the help
          of Access token
        </p>
      </Header>

      <ListWrapper>
        <List>
          <ListElem>Validate your Access token</ListElem>
          <ListElem>Find a GitHub Public Repo</ListElem>
          <ListElem>Provides the repo details of Results</ListElem>
        </List>
      </ListWrapper>
      <Button primary onClick={nextPage}>
        Go!{' '}
      </Button>
    </HomePage>
  )
}
