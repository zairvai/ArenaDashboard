import {createAccountCustomRoutine,createAccountRoutine} from './routine'

import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){

        case createAccountCustomRoutine.INIT:
            return Object.assign({},state,{
                showFormAdd:true,
            })
            

        case createAccountCustomRoutine.CANCEL:
            delete state.showFormAdd
            return Object.assign({},state,state)

            

        case createAccountRoutine.REQUEST:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case createAccountRoutine.SUCCESS :
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
        case createAccountRoutine.FAILURE:
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