import {Auth} from 'aws-amplify'
import {put,takeEvery,select} from 'redux-saga/effects'
import {changePasswordRoutine} from './routine'

function* authChangePassword(action){

    try{

        yield put(changePasswordRoutine.request())

        const {payload} = action
        const values = payload.values
        const oldPassword = values.currentPassword.trim()
        const newPassword = values.password.trim()

        const user = yield Auth.currentAuthenticatedUser()
        const data = yield Auth.changePassword(user,oldPassword,newPassword)
        
        yield put(changePasswordRoutine.success({data}))
        

    }catch(error){
        yield put(changePasswordRoutine.failure({error}))
    }
    finally{
        yield put(changePasswordRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(changePasswordRoutine.TRIGGER,authChangePassword)
}
