// @flow
import reducer from './reducer'
import * as actions from './actions'

test('default action', () => {
  // $FlowFixMe
  expect(reducer(undefined, { type: 'default action' })).toMatchSnapshot()
})
