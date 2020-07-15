import React from 'react'
import {Button} from 'react-bootstrap'

export const pageHeader = Content =>{

    return props => {

        return(
            <div className="d-flex justify-content-between align-items-center pr-3 py-2 border-bottom">
                <Content/>
            </div>
        )
    }
}

export const TextLink = props =><Button variant="link" {...props}>{props.children}</Button>
