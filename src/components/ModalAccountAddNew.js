import React,{useState} from 'react'
import {submit} from 'redux-form'
import {Modal} from 'react-bootstrap'
import {Button} from 'semantic-ui-react'
import {TextLink} from './Parts'
import FormAccountAddNew from './FormAccountAddNew'

export default ({show,onHide=false,dispatch}) => {

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    return (
        <Modal onHide={onHide} show={show} keyboard={false} backdrop={true} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title as="h6">Create new account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAccountAddNew onCancel={onHide} onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-end pt-2">          
                <div>
                    <TextLink size="sm" className="font-medium link pl-0" onClick={onHide} >Cancel</TextLink>
                    <Button color="pink" size="medium" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('formAccountAddNew'))}>Create new Account</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}