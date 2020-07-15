import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'
import {forgotPasswordRoutine} from './routine'

function* authForgotPassword(action){

    var username

    try{

        yield put(forgotPasswordRoutine.request())

        const {payload} = action

        if(payload.values) username = payload.values.username.replace(/\s/g,"") //from form
        else username = payload.username.replace(/\s/g,"") //from button

        const data = yield Auth.forgotPassword(username)

        yield put(forgotPasswordRoutine.success({
            data: {
                user:{username}
                ,...data
            }
        }))
                    
    }catch(error){
        yield put(forgotPasswordRoutine.failure({error}))
    }finally{
        yield put(forgotPasswordRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(forgotPasswordRoutine.TRIGGER,authForgotPassword)
}