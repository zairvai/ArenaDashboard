import {logoutRoutine} from './routine'
import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){

        //signing out
        case logoutRoutine.TRIGGER:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  

        case logoutRoutine.SUCCESS:

            delete state.isRequiredNewPassword
            delete state.isRequiredResetPassword
            delete state.isUserConfirmed
            delete state.isForgotPassword
            delete state.formData
            
            return Object.assign({},state,{
                isRequesting:false,
                isLoggedIn:false,
                data:false,
                error:false,
                isError:false
            })  

        case logoutRoutine.FAILURE:

            const error = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error
            }) 

        default:
            return state
    }

}