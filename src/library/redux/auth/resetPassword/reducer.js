import {resetPasswordRoutine} from './routine'
import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){

        case resetPasswordRoutine.TRIGGER:

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
            
        case resetPasswordRoutine.SUCCESS:

            delete state.isRequiredResetPassword
            delete state.isForgotPassword
            delete state.formData

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false
            })

        case resetPasswordRoutine.FAILURE:

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