import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const completeNewPasswordRoutine = createRoutine("COMPLETE_NEW_PASSWORD")
export const submitCompleteNewPasswordPromiseCreator = promisifyRoutine(completeNewPasswordRoutine)