import {createVenueCustomRoutine,createVenueRoutine} from './routine'

import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){

        case createVenueCustomRoutine.INIT:
            return Object.assign({},state,{
                showFormAdd:true,
                item:{}
            })
            

        case createVenueCustomRoutine.CANCEL:
            // delete state.showFormAdd
            return Object.assign({},state,{
                showFormAdd:false,
                item:{}
            })

        case createVenueCustomRoutine.UPDATE_ITEM:

            const {payload} = action
            const itemData = payload.item

            return Object.assign({},state,{
                item:{...state.item, ...itemData}
            })

        case createVenueRoutine.REQUEST:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case createVenueRoutine.SUCCESS :
        {
            delete state.showFormAdd

            const {payload} = action
            const data = payload.data

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                items:{data,...state.items}
            })     
        }
        case createVenueRoutine.FAILURE:
        {
            const {payload} = action

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:payload.error,
            })
        }
        default: return state
    }

}