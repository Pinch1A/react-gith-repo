import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import React from 'react'
import ReposPage from './ReposPage'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

const reposMock = [
  {
    node: {
      id: 'id-1',
      name: 'test-2',
      description: 'mock test 1',
      stargazers: { totalCount: 101 },
      url: 'test.test',
    },
  },
  {
    node: {
      id: 'id-2',
      name: 'test-2',
      description: 'mock test 2',
      stargazers: { totalCount: 102 },
      url: 'test.test',
    },
  },
]
const mockReducer = (data) => {
  return {
    repos: reposMock,
    loading: false,
    pageInfo: {},
    error: null,
    ...data,
  }
}

const mockTokenValidator = (data) => {
  return {
    token: 'token-test',
    ...data,
  }
}

describe('<ReposPage>', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      repoReducer: mockReducer(),
      tokenValidator: mockTokenValidator(),
    })
  })
  it('renders without crashing', () => {
    const props = {
      ...mockReducer(),
      ...mockTokenValidator(),
      repoSearch: jest.fn(),
      clearSearch: jest.fn(),
    }

    const wrapper = shallow(
      <Provider store={store}>
        <ReposPage {...props} />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('renders error message', () => {
    const error = {
      error: { message: 'Test' },
    }
    const props = {
      ...mockReducer(error),
      ...mockTokenValidator(),
      repoSearch: jest.fn(),
      clearSearch: jest.fn(),
    }

    store = mockStore({
      repoReducer: mockReducer(error),
      tokenValidator: mockTokenValidator(),
    })

    const wrapper = mount(
      <Provider store={store}>
        <ReposPage {...props} />
      </Provider>
    )
    expect(wrapper.find('p').text()).toContain('Test')
  })
  it('renders repos list', () => {
    const props = {
      ...mockReducer(),
      ...mockTokenValidator(),
      repoSearch: jest.fn(),
      clearSearch: jest.fn(),
    }

    store = mockStore({
      repoReducer: mockReducer(),
      tokenValidator: mockTokenValidator(),
    })

    const wrapper = mount(
      <Provider store={store}>
        <ReposPage {...props} />
      </Provider>
    )
    expect(wrapper.find('p').text()).toContain(
      `Search Result: Total ${reposMock.length} Repository`
    )
  })
})
