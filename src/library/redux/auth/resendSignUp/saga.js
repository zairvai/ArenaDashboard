import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import {resendSignupRoutine} from './routine'

function* authResendSignUp(action){

    try{

        yield put(resendSignupRoutine.request())

        const {payload} = action
        const username = payload.username.replace(/\s/g,"")

        const data = yield Auth.resendSignupRoutine(username)
        
        yield put(resendSignupRoutine.success({data}))
        

    }catch(error){
        yield put(resendSignupRoutine.failure(new SubmissionError({error,_error:error.message})))
    }
    finally{
        yield put(resendSignupRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(resendSignupRoutine.TRIGGER,authResendSignUp)
}
