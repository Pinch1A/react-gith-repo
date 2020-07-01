import { Home } from './Home'
import React from 'react'
import { shallow } from 'enzyme'

const props = {
  history: jest.fn(),
}

describe('<Home>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
