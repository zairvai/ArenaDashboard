import {loginRoutine} from './routine'

import initialState from '../initialState'

export default(state=initialState,action) => {

    switch(action.type){
        
        case loginRoutine.REQUEST:
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isLoggedIn:false,
                isError:false,
                data:false
            })

        case loginRoutine.SUCCESS :
        {
            delete state.isForgotPassword
            
            const {payload} = action

            return Object.assign({},state,{
                isRequesting:false,
                isLoggedIn:true,
                isError:false,
                error:false,
                data:payload
            })     
        }
        case loginRoutine.FAILURE:
        {
            const payload = action.payload
            const user = payload.user
            const error = payload.error

            if(error.code === "PasswordResetRequiredException"){
                state.isRequiredResetPassword = true
                state.formData = {
                    username:user.username
                }
            }else if(error.code === "NewPasswordRequired"){
                state.isRequiredNewPassword = true
                state.data = {
                    user:payload.data
                }
            }
            else if(error.code === "UserNotConfirmedException"){
                state.isUserConfirmed = false
                state.formData = {
                    username : user.username
                }
            }

            return Object.assign({},state,{
                isLoggedIn:false,
                isRequesting:false,
                isError:true,
                error:error,
            })
        }
        default: return state
    }

}