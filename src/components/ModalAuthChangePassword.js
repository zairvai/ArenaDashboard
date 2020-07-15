import React from 'react'
import {Modal} from 'react-bootstrap'
import FormAuthChangePassword from './FormAuthChangePassword'

const ChangePassword = ({show,onHide=false,onSuccess=false,...props}) => {

    function handleCancel(){
        if(onHide && typeof onHide == 'function') onHide()
    }

    const doChangePassword = values => {
        console.log(values)
    }

    return (
        <Modal {...props} onHide={handleCancel}
            show={show} keyboard={false} backdrop={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title as="h6">Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAuthChangePassword {...props} onCancel={handleCancel.bind(this)} onSubmit={doChangePassword}/>
            </Modal.Body>
            
        </Modal>
    )

}

export default ChangePassword