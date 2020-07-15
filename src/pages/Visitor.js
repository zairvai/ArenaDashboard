import React from 'react'
import {Helmet} from 'react-helmet'

const Visitor = ({dispatch,state,auth,...props}) => {

    return <>
        <Helmet>
            <title>{props.route.name}</title>
        </Helmet>
    </>

}

export default Visitor