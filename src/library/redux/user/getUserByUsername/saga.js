import {API} from 'aws-amplify'
import * as queries from '../../../../graphql/queries'
import {put,takeEvery} from 'redux-saga/effects'
import {getUserRoutine} from './routine'

function* getUserByUsername(action){

    try{

        yield put(getUserRoutine.request())

        const {payload} = action
        
        const username = payload.username.replace(/\s/g,"")
        
        const response = yield API.graphql({
            query: queries.getUserByUsername,
            variables:{username:username},
            authMode:"API_KEY"
        })

        if(!response.data.getUserByUsername) yield put(getUserRoutine.failure({error:"no user found"}))
        else yield put(getUserRoutine.success({data:response.data.getUserByUsername}))
                    
    }catch(error){
        yield put(getUserRoutine.failure({error}))
    }finally{
        yield put(getUserRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(getUserRoutine.TRIGGER,getUserByUsername)
}