import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'
import {loginRoutine} from './routine'

function* authLogin(action){

    yield put(loginRoutine.request())

    const {payload} = action
    const values = payload.values
    const username = values.username.replace(/\s/g,"")
    const password = values.password.replace(/\s/g,"")

    try{

        const user = yield Auth.signIn(username,password)

        if(user.challengeName === "NEW_PASSWORD_REQUIRED"){
            
            yield put(loginRoutine.failure({
                error:{
                    code:"NewPasswordRequired"
                },
                data:user
            }))
        }
        else{
            yield put(loginRoutine.success({user}))
        }
        

    }catch(error){

        yield put(loginRoutine.failure({
            user:{
                username:username
            },
            error
        }))
    }
    finally{
        yield put(loginRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(loginRoutine.TRIGGER,authLogin)
}
