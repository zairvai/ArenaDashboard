import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'
import {resetPasswordRoutine} from './routine'

function* authResetPassword(action){

    try{

        yield put(resetPasswordRoutine.request())

        const {payload} = action
        const values = payload.values
        const username = values.username.replace(/\s/g,"")
        const code = values.code.replace(/\s/g,"")
        const password = values.password.replace(/\s/g,"")

        const data = yield Auth.forgotPasswordSubmit(username,code,password)

        yield put(resetPasswordRoutine.success({data}))

    }catch(error){
        console.log(error)
        yield put(resetPasswordRoutine.failure({error}))
    }
    finally{
        yield put(resetPasswordRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery( resetPasswordRoutine.TRIGGER,authResetPassword)
}
