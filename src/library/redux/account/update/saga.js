import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from '../../../../graphql/mutations'
import {put,takeEvery} from 'redux-saga/effects'
import {updateAccountRoutine} from './routine'
import AccountObject from '../../../object/AccountObject'

function* updateAccount(action){

    try{

        yield put(updateAccountRoutine.request())

        const {payload} = action
        const values = payload.values
        const id = values.id.replace(/\s/g,"")
        const name = values.name.trim()
        const status = values.status ? 1 : 0
        const expectedVersion = values.version
        const response = yield API.graphql(graphqlOperation(mutations.updateAccount,{input:{id,name,status,expectedVersion}}))

        var responseItem = response.data.updateAccount

        if(responseItem) {
            const accountObject = new AccountObject(responseItem)
            yield put(updateAccountRoutine.success({data:accountObject}))
        }
        else yield put(updateAccountRoutine.success({data:responseItem}))

                    
    }catch(error){
        yield put(updateAccountRoutine.failure({error}))
    }finally{
        yield put(updateAccountRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(updateAccountRoutine.TRIGGER,updateAccount)
}