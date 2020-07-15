import {getUserRoutine} from './routine'

export const getCognitoByUsername = payload => ({
    type:getUserRoutine.TRIGGER,
    payload
})