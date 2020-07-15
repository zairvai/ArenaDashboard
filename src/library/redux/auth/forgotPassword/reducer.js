import {forgotPasswordRoutine} from './routine'
import initialState from '../initialState'

export default (state=initialState,action)=>{

    switch(action.type){
        
        case forgotPasswordRoutine.REQUEST :

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case forgotPasswordRoutine.SUCCESS :
        {
            const payload = action.payload
            const data = payload.data

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,   
                error:false,
                isForgotPassword:true,
                formData:{
                    username:data.user.username
                },
                data:payload.data 
            })
        }

        case forgotPasswordRoutine.FAILURE : 
        {
            const payload = action.payload
            const error = payload.error
            console.log(payload)
            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error
            })
        }
        default: return state
    }

}