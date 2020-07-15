import {createRoutine,promisifyRoutine,} from 'redux-saga-routines'
export const resetPasswordRoutine = createRoutine("RESET_PASSWORD")
export const submitResetPasswordPromiseCreator = promisifyRoutine(resetPasswordRoutine)