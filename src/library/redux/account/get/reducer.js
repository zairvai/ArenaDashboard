import {getAccountCustomRoutine,getAccountRoutine} from './routine'

import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){
            
        case getAccountCustomRoutine.CANCEL:
            delete state.showDetail
            return Object.assign({},state,{
                item:false
            })


        case getAccountRoutine.REQUEST:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })

        case getAccountRoutine.SUCCESS :
        {
            delete state.showFormAdd

            const {payload} = action
            const data = payload.data

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                showDetail:true,
                item:data
            })     
        }
        case getAccountRoutine.FAILURE:
        {
            const {payload} = action

            return Object.assign({},state,{
                isLoggedIn:false,
                isRequesting:false,
                isError:true,
                error:payload.error,
            })
        }
        default: return state
    }

}