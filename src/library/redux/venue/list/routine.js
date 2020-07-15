import {createRoutineCreator,createRoutine,promisifyRoutine} from 'redux-saga-routines'

const customCreateRoutine = createRoutineCreator(["INIT"])
export const listVenuesCustomRoutine = customCreateRoutine("LIST_VENUES_CUSTOM")

export const listVenuesRoutine = createRoutine("LIST_VENUES")
export const getListVenuesPromiseCreator = promisifyRoutine(listVenuesRoutine)
