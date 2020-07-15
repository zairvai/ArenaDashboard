import {getUserRoutine} from './routine'
import initialState from '../initialState'

export default (state=initialState,action)=>{

    switch(action.type){
        
        case getUserRoutine.REQUEST :

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                data:false
            })

        case getUserRoutine.SUCCESS :
        {
            const payload = action.payload
            //console.log(payload)

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,   
                error:false,
                data:payload && payload.data ? payload.data : null 
            })
        }

        case getUserRoutine.FAILURE : 
        {
            const payload = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error: payload && payload.error ? payload.error : null
            })
        }
        default: return state
    }

}