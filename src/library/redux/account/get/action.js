import {getAccountRoutine,getAccountCustomRoutine} from './routine'

export const getAccount = payload =>({
    type:getAccountRoutine.TRIGGER,
    payload

})

export const getAccountCancel = () =>({
    type:getAccountCustomRoutine.CANCEL
})
