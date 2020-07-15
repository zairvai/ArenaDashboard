import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const loginRoutine = createRoutine("LOGIN")

export const submitLoginPromiseCreator = promisifyRoutine(loginRoutine)
