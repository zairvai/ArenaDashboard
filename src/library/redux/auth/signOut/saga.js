import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'

import {logoutRoutine} from './routine'

function* authLogout(){

    try{
        yield put(logoutRoutine.request())

        yield Auth.signOut()
        yield put(logoutRoutine.success())

    }catch(error){
        yield put(logoutRoutine.failure(error))
    }
    finally{
        yield put(logoutRoutine.fulfill())
    }
}

export function* watcher(){
    yield takeEvery(logoutRoutine.TRIGGER,authLogout)
}
