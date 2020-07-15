import {Auth} from 'aws-amplify'
import {put,takeEvery} from 'redux-saga/effects'
import {registerRoutine} from './routine'

function* authRegister(action){

    try{

        yield put(registerRoutine.request())

        const {payload} = action
        const values = payload.values
        const username = values.username.replace(/\s/g,"")
        const password = values.password.replace(/\s/g,"")
        const countryCode = values.countryCode.replace(/\s/g,"")
        const phone_number = countryCode + values.phoneNumber.replace(/\s/g,"")
        const name = values.accountName.trim()

        const data = yield Auth.signUp({username,password,attributes: {email:username,phone_number,name}})

        yield put(registerRoutine.success({data}))
                    
    }catch(error){
        console.log(error)
        yield put(registerRoutine.failure({error}))
    }finally{
        yield put(registerRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(registerRoutine.TRIGGER,authRegister)
}