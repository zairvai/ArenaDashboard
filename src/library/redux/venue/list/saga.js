import {API,graphqlOperation} from 'aws-amplify'
import * as queries from '../../../../graphql/queries'
import {put,takeEvery} from 'redux-saga/effects'
import {listVenuesRoutine} from './routine'
import VenueObject from '../../../object/VenueObject'

function* listVenues(action){

    try{

        const {accountId,orderBy,direction,from,size} = action.payload

        yield put(listVenuesRoutine.request({from,size}))
                
        const response = yield API.graphql(graphqlOperation(queries.listVenues,{input:{accountId,orderBy,direction,from,size}}))

        const record = response.data.listVenues

        if(record.items){

            let listObjects = {}
            
            record.items.forEach(item=>{
                const object = new VenueObject(item)
                listObjects[item.id] = object
            })

            yield put(listVenuesRoutine.success({
                data:{
                    items:listObjects,
                    foundDocs : record.foundDocs
                }
            }))

        }else yield put(listVenuesRoutine.success({data:record}))
                    
    }catch(error){
        yield put(listVenuesRoutine.failure({error}))
    }finally{
        yield put(listVenuesRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(listVenuesRoutine.TRIGGER,listVenues)
}