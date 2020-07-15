import React from 'react'
import {Form,Row} from 'react-bootstrap'
import {getStatusIcon} from '../utility/Helper'

export default ({itemObject}) => {

    if(!itemObject) return false

    return (
        <>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label className="font-medium" column sm={2}>Name</Form.Label>
                    <Form.Label className="font-medium" column sm={10}>{itemObject.getName()}</Form.Label>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label className="font-medium" column sm={2}>Status</Form.Label>
                    <Form.Label className="font-medium p-0" column sm={10}>{getStatusIcon(itemObject.getStatus())}</Form.Label>
                </Form.Group>
            </Form>
        </>
    )
}