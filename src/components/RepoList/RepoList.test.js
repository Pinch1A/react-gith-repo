import { mount, shallow } from 'enzyme'
import { Button } from '../../App'
import React from 'react'
import RepoList from './RepoList'
const repos = [
  {
    node: {
      id: 'id-1',
      name: 'test-1',
      description: 'mock test 1',
      stargazers: { totalCount: 101 },
    },
  },
  {
    node: {
      id: 'id-2',
      name: 'test-2',
      description: 'mock test 2',
      stargazers: { totalCount: 102 },
    },
  },
]

describe('<RepoList>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <RepoList repos={repos} fetchMoreRepo={jest.fn()} pageInfo={{}} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('has more content to show', () => {
    const pageInfo = {
      hasNextPage: true,
    }
    const wrapper = shallow(
      <RepoList repos={repos} fetchMoreRepo={jest.fn()} pageInfo={pageInfo} />
    )
    const expected = 'Load More'
    expect(wrapper.find(Button).text()).toEqual(expected)
  })
  it('has not more content to show', () => {
    const pageInfo = {
      hasNextPage: false,
    }
    const wrapper = shallow(
      <RepoList repos={repos} fetchMoreRepo={jest.fn()} pageInfo={pageInfo} />
    )
    const expected = 'No more results,Go To Top'
    expect(wrapper.find(Button).text()).toEqual(expected)
  })
})
