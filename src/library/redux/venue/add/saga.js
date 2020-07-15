import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from '../../../../graphql/mutations'
import {put,takeEvery} from 'redux-saga/effects'
import {createVenueRoutine} from './routine'
import VenueObject from '../../../object/VenueObject'

function* createVenue(action){

    try{

        yield put(createVenueRoutine.request())

        const {payload} = action
        const values = payload.values
        const accountId = values.accountId.trim()
        const name = values.name.trim()
        
        const response = yield API.graphql(graphqlOperation(mutations.createVenue,{input:{
            accountId,
            name
        }}))

        var responseItem = response.data.createAccount

        if(responseItem) {
            const accountObject = new VenueObject(responseItem)
            yield put(createVenueRoutine.success({data:accountObject}))
        }
        else yield put(createVenueRoutine.success({data:responseItem}))

                    
    }catch(error){
        yield put(createVenueRoutine.failure({error}))
    }finally{
        yield put(createVenueRoutine.fulfill())
    }

}

export function* watcher(){
    yield takeEvery(createVenueRoutine.TRIGGER,createVenue)
}