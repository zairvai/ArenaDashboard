import {listVenuesCustomRoutine,listVenuesRoutine} from './routine'

export const listVenuesInit = () =>({
    type:listVenuesCustomRoutine.INIT
})

export const listVenues = payload => ({
    type:listVenuesRoutine.TRIGGER,
    payload
})