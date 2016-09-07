import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, Start, next} from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* startSaga(){
  while(true){
    yield take(`${Start}`)
    let q = [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5]
    {
      let i = q.length
      while(i){
        let j = Math.floor(Math.random() * i)
        let t = q[--i]
        q[i] = q[j]
        q[j] = t
      }
    }
    yield call(sendData, 'set question',q)
  }
}

function* nextSaga(){
  while(true){
    const { payload:{choice, type} } = yield take(`${next}`)
    const { add: add, plus: plus } = yield select(({ add, plus }) => ({ add, plus }))
    var flag = (choice == 1)? +1 : -1
    flag = (type <= 2)? +flag : -flag
    switch(type){
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        plus[type] = Math.abs(plus[type]) * flag
        yield call(sendData, 'next',  {add: add, plus: plus, choice: choice, type: type})
        break;
      case 7:
        yield call(sendData, 'finish')
        break;
      default:
        yield call(sendData, 'next', {add: add, plus: plus, choice: choice, type: type})
        break
  }
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(startSaga)
  yield fork(nextSaga)
}

export default saga
