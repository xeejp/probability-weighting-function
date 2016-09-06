import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import { changePage } from './actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    [changePage]: (_, { payload }) => ({ page: payload }),
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {[id]: participant}) 
    }),
    'start': ({ participants }, {payload :{ id } } ) => {
      const result = Object.assign({},participants)
	    result[id].state = 1
      return ( { participants: result } )
    },
    'update_result': ({ participants }, { payload: {id, add, plus}}) => {
      const result = Object.assign({}, participants)
      result[id].add = add
      result[id].plus = plus
      return ({ participants: result })
    },
  }, {}),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer