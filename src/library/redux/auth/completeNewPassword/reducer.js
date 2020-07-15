import {completeNewPasswordRoutine} from './routine'

import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){
        case completeNewPasswordRoutine.TRIGGER:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
        case completeNewPasswordRoutine.SUCCESS:

            delete state.isRequiredNewPassword
            
            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false
            })  
            
        case completeNewPasswordRoutine.FAILURE:

            const payload = action.payload
            const error = payload.error

            return Object.assign({},state,{
                isRequesting:false,
                error:error,
                isError:true
            }) 
            
        default:
            return state
    }

}