import {updateAccountCustomRoutine} from './routine'

export const updateAccountInit = () =>({
    type:updateAccountCustomRoutine.INIT
})

export const updateAccountCancel = () =>({
    type:updateAccountCustomRoutine.CANCEL
})
