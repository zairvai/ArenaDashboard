import React from 'react'
import {Helmet} from 'react-helmet'

const Payment = ({dispatch,state,auth,...props}) => {

    return <>
        <Helmet>
            <title>{props.route.name}</title>
        </Helmet>
    </>

}

export default Payment