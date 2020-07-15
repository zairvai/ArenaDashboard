import {createRoutine,promisifyRoutine} from 'redux-saga-routines'
export const confirmSignUpRoutine = createRoutine("CONFIRM_SIGNUP")
export const submitConfirmSignUpPromiseCreator = promisifyRoutine(confirmSignUpRoutine)
