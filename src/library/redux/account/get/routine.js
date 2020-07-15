import {createRoutineCreator,createRoutine} from 'redux-saga-routines'

const customCreateRoutine = createRoutineCreator(["CANCEL"])
export const getAccountCustomRoutine = customCreateRoutine("GET_ACCOUNT_CUSTOM")
export const getAccountRoutine = createRoutine("GET_ACCOUNT")