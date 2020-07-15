import {confirmSignUpRoutine} from './routine'
import initialState from '../initialState'

export default (state=initialState,action)=>{

    switch(action.type){
        
        case confirmSignUpRoutine.REQUEST :

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case confirmSignUpRoutine.SUCCESS :
        {
            delete state.isUserConfirmed
            delete state.formData
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,   
                error:false  
            })
        }

        case confirmSignUpRoutine.FAILURE : 
        {
            const payload = action.payload
            const error = payload.error

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error
            })
        }
        default: return state
    }

}