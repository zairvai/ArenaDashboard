import {createRoutineCreator,createRoutine,promisifyRoutine} from 'redux-saga-routines'

const customCreateRoutine = createRoutineCreator(["INIT","CANCEL"])
export const createAccountCustomRoutine = customCreateRoutine("CREATE_ACCOUNT_CUSTOM")

export const createAccountRoutine = createRoutine("CREATE_ACCOUNT")
export const submitCreateAccountPromiseCreator = promisifyRoutine(createAccountRoutine)