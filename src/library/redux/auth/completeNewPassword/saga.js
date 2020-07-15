import {Auth} from 'aws-amplify'
import {put,takeEvery,select} from 'redux-saga/effects'
import {completeNewPasswordRoutine} from './routine'

function* authCompleteNewPassword(action){

    try{

        yield put(completeNewPasswordRoutine.request())

        const user = yield select(state=>state.auth.data.user)

        console.log(user)

        const {payload} = action
        const values = payload.values
        const password = values.password.replace(/\s/g,"")
        const name = values.name.trim()

        const data = yield Auth.completeNewPassword(user,password,{name:name})
        
        yield put(completeNewPasswordRoutine.success({data}))
        

    }catch(error){
        yield put(completeNewPasswordRoutine.failure({error}))
    }
    finally{
        yield put(completeNewPasswordRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(completeNewPasswordRoutine.TRIGGER,authCompleteNewPassword)
}
