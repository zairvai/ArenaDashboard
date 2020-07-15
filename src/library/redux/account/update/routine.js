import {createRoutineCreator,createRoutine,promisifyRoutine} from 'redux-saga-routines'

const customCreateRoutine = createRoutineCreator(["INIT","CANCEL"])
export const updateAccountCustomRoutine = customCreateRoutine("UPDATE_ACCOUNT_CUSTOM")

export const updateAccountRoutine = createRoutine("UPDATE_ACCOUNT")
export const submitUpdateAccountPromiseCreator = promisifyRoutine(updateAccountRoutine)
