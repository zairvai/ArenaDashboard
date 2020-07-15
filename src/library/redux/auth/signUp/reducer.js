import {registerRoutine} from './routine'
import initialState from '../initialState'

export default (state=initialState,action)=>{

    switch(action.type){
        
        case registerRoutine.REQUEST :

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case registerRoutine.SUCCESS :
        {
            const payload = action.payload
            const data = payload.data

            if(data.userConfirmed===false){
                state.isUserConfirmed = data.userConfirmed
                state.formData = {
                    username : data.user.username
                }
            }

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,   
                error:false ,
                data:payload.data
            })
        }

        case registerRoutine.FAILURE : 
        {
            const payload = action.payload
            const error = payload.error

            console.log(error)

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error
            })
        }
        default: return state
    }

}