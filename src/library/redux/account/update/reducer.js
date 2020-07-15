import {updateAccountCustomRoutine,updateAccountRoutine} from './routine'

import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){

        case updateAccountCustomRoutine.INIT:
            return Object.assign({},state,{
                showFormUpdate:true,
            })
            

        case updateAccountCustomRoutine.CANCEL:
            delete state.showFormUpdate
            return Object.assign({},state,state)

            

        case updateAccountRoutine.REQUEST:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case updateAccountRoutine.SUCCESS :
        {
            delete state.showFormUpdate
            delete state.showDetail
            
            const {payload} = action
            let items = {...state.items}

            if(payload.data){
                const data = payload.data
                items[data.getId()] = data
            }

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                item:false,
                items:items
            })     
        }
        case updateAccountRoutine.FAILURE:
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