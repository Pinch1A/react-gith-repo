import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'

const mockStore = configureStore([])

describe('<App>', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      token: 'token-test',
    })
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
