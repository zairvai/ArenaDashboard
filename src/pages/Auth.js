import React from 'react'
import {Redirect} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {connect} from 'react-redux'


const AuthIndex = ({state,dispatch,...props}) => {
  
    var isLoggedIn = state.auth.isLoggedIn

    if(isLoggedIn) {
        
        const {from} = props.location.state || {from:{pathname:'/app'}}
        return <Redirect to={from}/>
    }
    else{
    
        return(
            <>
                {renderRoutes(props.route.routes,{state,dispatch,...props})}
            </>
        )
    }

    
}

const mapStateToProps = state => ({
    state
})

export default connect(mapStateToProps)(AuthIndex)