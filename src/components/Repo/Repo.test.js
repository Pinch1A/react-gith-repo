import React from 'react'
import Repo from './Repo'
import { shallow } from 'enzyme'

const repository = {
  name: 'test',
  description: 'mock test',
  stargazers: { totalCount: 100 },
  url: 'test.test',
}
describe('<Repo>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Repo repository={repository} />)
    expect(wrapper).toMatchSnapshot()
  })
})
