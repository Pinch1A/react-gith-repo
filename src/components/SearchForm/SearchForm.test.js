import React from 'react'
import SearchForm from './SearchForm'
import { shallow } from 'enzyme'

const props = {
  searchString: '',
  handleForm: jest.fn(),
  onChange: jest.fn(),
  clearSearch: jest.fn(),
}

describe('<SearchForm>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SearchForm {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
