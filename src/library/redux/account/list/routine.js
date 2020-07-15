import {createRoutineCreator,createRoutine,promisifyRoutine} from 'redux-saga-routines'

const customCreateRoutine = createRoutineCreator(["INIT"])
export const listAccountsCustomRoutine = customCreateRoutine("LIST_ACCOUNTS_CUSTOM")

export const listAccountsRoutine = createRoutine("LIST_ACCOUNTS")
export const getListAccountsPromiseCreator = promisifyRoutine(listAccountsRoutine)