import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: ${(props) => (props.primary ? 'orange' : 'grey')};
  color: white;
  border: none;
  width: 30%;
  border-radius: 5px;
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`
const SearchInput = styled.input`
  min-width: 300px;
`

const StyledForm = styled.form`
  display: flex;
`

const SearchForm = ({ searchString, handleForm, onChange, clearSearch }) => (
  <FormWrapper>
    <StyledForm autoComplete="off" onSubmit={() => handleForm}>
      <SearchInput
        name="repoName"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Repositories by name"
        value={searchString}
      />
    </StyledForm>

    <Button onClick={clearSearch}>Clear Results</Button>
  </FormWrapper>
)
export default SearchForm
