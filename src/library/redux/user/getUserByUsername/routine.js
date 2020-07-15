import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const getUserRoutine = createRoutine("GET_USER_BY_USERNAME")
export const getUserPromiseCreator = promisifyRoutine(getUserRoutine)