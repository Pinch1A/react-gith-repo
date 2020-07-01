import TokenValidator, { Title } from './TokenValidation'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

const mockTokenValidator = (data) => {
  return {
    token: 'token-test',
    loading: false,
    error: null,
    ...data,
  }
}

describe('<ReposPage>', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      tokenValidator: mockTokenValidator(),
    })
  })
  it('renders without crashing', () => {
    const props = {
      ...mockTokenValidator(),
      history: jest.fn(),
    }

    const wrapper = shallow(
      <Provider store={store}>
        <TokenValidator {...props} />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('shows title', () => {
    const props = {
      ...mockTokenValidator(),
      history: jest.fn(),
    }

    const wrapper = mount(
      <Provider store={store}>
        <TokenValidator {...props} />
      </Provider>
    )
    expect(wrapper.find(Title).text()).toEqual('Token Validator')
  })
})
