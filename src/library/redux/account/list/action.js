import {listAccountsCustomRoutine,listAccountsRoutine} from './routine'

export const listAccountsInit = () =>({
    type:listAccountsCustomRoutine.INIT
})

export const listAccounts = payload => ({
    type:listAccountsRoutine.TRIGGER,
    payload
})