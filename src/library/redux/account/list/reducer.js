import {listAccountsCustomRoutine,listAccountsRoutine} from './routine'

import initialState from '../initialState'

export default (state=initialState,action)=>{

    switch(action.type){
        
        case listAccountsCustomRoutine.INIT :

            return Object.assign({},state,initialState)

        case listAccountsRoutine.REQUEST :

            const {from,size} = action.payload

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                items:state.items,
                size:size,
                from:from
            })

        case listAccountsRoutine.SUCCESS :
        {
            
            const {items,foundDocs} = action.payload.data

            var stateItems = {...stateItems}

            if(items){
                stateItems = {...stateItems,...items}
            }

            return Object.assign({},state,{
                initiated:true,
                isRequesting:false,
                isError:false,   
                error:false,
                items:stateItems,
                nextFrom:state.from + state.size,
                total:foundDocs
            })
        }

        case listAccountsRoutine.FAILURE : 
        {
            const payload = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error: payload.error
            })
        }
        default: return state
    }

}