import {createVenueCustomRoutine} from './routine'

export const createVenueInit = () =>({
    type:createVenueCustomRoutine.INIT
})

export const createVenueCancel = () =>({
    type:createVenueCustomRoutine.CANCEL
})

export const createVenueItem = payload => ({
    type:createVenueCustomRoutine.UPDATE_ITEM,
    payload
})