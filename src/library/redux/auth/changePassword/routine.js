import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const changePasswordRoutine = createRoutine("CHANGE_PASSWORD")
export const submitChangePasswordPromiseCreator = promisifyRoutine(changePasswordRoutine)