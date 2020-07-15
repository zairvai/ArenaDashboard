import {API,graphqlOperation} from 'aws-amplify'
import * as queries from '../../../../graphql/queries'
import {put,takeEvery} from 'redux-saga/effects'
import {getAccountRoutine} from './routine'
import AccountObject from '../../../object/AccountObject'

function* getAccount(action){

    try{

        yield put(getAccountRoutine.request())

        const {payload} = action
        const item = payload.item
        
        const response = yield API.graphql(graphqlOperation(queries.getAccount,{input:{id:item.getId()}}))

        var responseItem = response.data.getAccount

        if(responseItem) {
    
            const accountObject = new AccountObject(responseItem)

            yield put(getAccountRoutine.success({data:accountObject}))

        }else yield put(getAccountRoutine.success({data:responseItem}))
                    
    }catch(error){
        yield put(getAccountRoutine.failure({error}))
    }finally{
        yield put(getAccountRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(getAccountRoutine.TRIGGER,getAccount)
}