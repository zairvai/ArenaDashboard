import React,{useState} from 'react'
import {Helmet} from 'react-helmet'
import {submit} from 'redux-form'
import {Modal,Container,Alert,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import FormAuthCompleteNewPassword from '../../components/FormAuthCompleteNewPassword'
import { authLogout } from '../../library/redux/auth/signOut/action'

const AuthCompleteNewPassword = ({state,dispatch}) =>{
     
    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    if(!state.auth.isRequiredNewPassword){
        return <Redirect to="/auth/login"/>
    }else{

        return(
            <>
                <Helmet>
                    <title>Complete new password</title>
                </Helmet>
                <Container id="container" fluid>
                    <div className="fullHeight d-flex flex-column justify-content-center align-items-center">
                        <Modal id="login"
                            show={true} backdrop={false}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header>
                                <Modal.Title as="h5">Change password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Alert variant="success">
                                    <p className="font font-medium mb-0">Please complete your details below and change your password.</p>
                                </Alert>
                                <FormAuthCompleteNewPassword onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-between pt-2">
                                
                                <Button variant="link" size="sm" className="font-medium link" onClick={()=>dispatch(authLogout())}>back to Login page</Button>
                                <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit("completeNewPasswordForm"))}>Save password</Button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                </Container>
            </>
        )
    }

}

export default AuthCompleteNewPassword
