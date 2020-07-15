import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const registerRoutine = createRoutine("REGISTER")
export const submitRegisterPromiseCreator = promisifyRoutine(registerRoutine)
