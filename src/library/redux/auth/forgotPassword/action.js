import {forgotPasswordRoutine} from './routine'

export const resendForgotPasswordCode = payload => ({
    type:forgotPasswordRoutine.TRIGGER,
    payload
})
