import React from 'react'
import {Helmet} from 'react-helmet'
import {renderRoutes} from 'react-router-config'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

const Root = ({route}) => {

    return(
        <>
            <Helmet titleTemplate="%s | Arena" defaultTitle="Loading ... | Arena">
                <meta charSet="utf-8" />
                <meta name="description" content="Arena Sport Management System"/>
            </Helmet>
            {renderRoutes(route.routes)}
        </>
    )
}

export default Root