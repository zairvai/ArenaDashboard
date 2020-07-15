import {createRoutineCreator,createRoutine,promisifyRoutine} from 'redux-saga-routines'

const customCreateRoutine = createRoutineCreator(["INIT","CANCEL","UPDATE_ITEM"])
export const createVenueCustomRoutine = customCreateRoutine("CREATE_VENUE_CUSTOM")

export const createVenueRoutine = createRoutine("CREATE_VENUE")
export const submitCreateVenuePromiseCreator = promisifyRoutine(createVenueRoutine)