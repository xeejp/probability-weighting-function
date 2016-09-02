import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ actives: payload }),
    'reset': (_, { payload: {ansed, rate, question, add, plus, befor, state, slideIndex} }) => ( 
      {
        ansed: ansed, rate: rate, question: question, add: add, plus: plus, befor: befor, state: state, slideIndex: slideIndex
      }
    ),
    'set question': (_, { payload }) => (
      {
        question: payload,
        state: 1,
      }
    ),
    'change index': (_, {payload:{ slideIndex_data, add, plus }}) => (
      {
        slideIndex: slideIndex_data,
        add: add,
        plus: plus,
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