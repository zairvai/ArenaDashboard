import {createAccountCustomRoutine} from './routine'

export const createAccountInit = () =>({
    type:createAccountCustomRoutine.INIT
})

export const createAccountCancel = () =>({
    type:createAccountCustomRoutine.CANCEL
})
