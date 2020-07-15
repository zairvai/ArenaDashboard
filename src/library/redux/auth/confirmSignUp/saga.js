import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'
import {confirmSignUpRoutine} from './routine'

function* authConfirmSignUp(action){

    try{

        yield put(confirmSignUpRoutine.request())

        const {payload} = action
        const values = payload.values
        const username = values.username.replace(/\s/g,"")
        const code = values.code.replace(/\s/g,"")

        const data = yield Auth.confirmSignUp(username, code, {forceAliasCreation: true})

        yield put(confirmSignUpRoutine.success({data}))
                    
    }catch(error){
        yield put(confirmSignUpRoutine.failure({error}))
    }finally{
        yield put(confirmSignUpRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(confirmSignUpRoutine.TRIGGER,authConfirmSignUp)
}