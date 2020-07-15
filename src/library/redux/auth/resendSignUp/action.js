import {resendSignupRoutine} from './routine'

export const resendSignUp = payload => ({
    type:resendSignupRoutine.TRIGGER,
    payload
})
