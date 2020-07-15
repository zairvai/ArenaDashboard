import {API,graphqlOperation} from 'aws-amplify'
import * as queries from '../../../../graphql/queries'
import {put,takeEvery} from 'redux-saga/effects'
import {listAccountsRoutine} from './routine'
import AccountObject from '../../../object/AccountObject'

function* listAccounts(action){

    try{

        const {orderBy,direction,from,size} = action.payload

        yield put(listAccountsRoutine.request({from,size}))
                
        const response = yield API.graphql(graphqlOperation(queries.listAccounts,{input:{orderBy,direction,from,size}}))

        const record = response.data.listAccounts

        if(record.items){

            let listObjects = {}
            
            record.items.forEach(item=>{
                const object = new AccountObject(item)
                listObjects[item.id] = object
            })

            yield put(listAccountsRoutine.success({
                data:{
                    items:listObjects,
                    foundDocs : record.foundDocs
                }
            }))

        }else yield put(listAccountsRoutine.success({data:record}))
                    
    }catch(error){
        yield put(listAccountsRoutine.failure({error}))
    }finally{
        yield put(listAccountsRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(listAccountsRoutine.TRIGGER,listAccounts)
}