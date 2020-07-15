import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const forgotPasswordRoutine = createRoutine("FORGOT_PASSWORD")
export const submitForgotPasswordPromiseCreator = promisifyRoutine(forgotPasswordRoutine)
