import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from '../../../../graphql/mutations'
import {put,takeEvery} from 'redux-saga/effects'
import {createAccountRoutine} from './routine'
import AccountObject from '../../../object/AccountObject'

function* createAccount(action){

    try{

        yield put(createAccountRoutine.request())

        const {payload} = action
        const values = payload.values
        const name = values.name.trim()
        
        const response = yield API.graphql(graphqlOperation(mutations.createAccount,{input:{name}}))

        var responseItem = response.data.createAccount

        if(responseItem) {
            const accountObject = new AccountObject(responseItem)
            yield put(createAccountRoutine.success({data:accountObject}))
        }
        else yield put(createAccountRoutine.success({data:responseItem}))

                    
    }catch(error){
        yield put(createAccountRoutine.failure({error}))
    }finally{
        yield put(createAccountRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(createAccountRoutine.TRIGGER,createAccount)
}