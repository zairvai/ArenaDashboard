import {resendSignupRoutine} from './routine'
import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){

        
        case resendSignupRoutine.TRIGGER:

            console.log(state.formData)
            
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isResendDisabled:true
            })  

        case resendSignupRoutine.SUCCESS:

            return Object.assign({},state,{
                isRequesting:false,
                isLoggedIn:false,
                data:false,
                error:false,
                isError:false,
                isResendDisabled:true
            })  

        case resendSignupRoutine.FAILURE:

            const error = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error,
                isResendDisabled:true
            }) 

        default:
            return state
    }

}