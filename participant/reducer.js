import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ actives: payload }),
    'reset': (_, { payload }) => ( 
      { //
      }
    ),
    'set question': (_, { payload }) => (
      {
        question: payload,
        state: 1,
      }
    ),
    'change index': (_, {payload:{ slideIndex_data, add }}) => (
      {
        slideIndex: slideIndex_data,
        add: add,
      }
    ),
    'to_result': (_, { payload }) => (
      {
        state: 2
      }
    )
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer