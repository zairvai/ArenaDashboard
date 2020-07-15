import React,{useState} from 'react'
import {Helmet} from 'react-helmet'
import {submit} from 'redux-form'
import {Modal,Container,Alert,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import FormAuthResetPassword from '../../components/FormAuthResetPassword'
import { authLogout } from '../../library/redux/auth/signOut/action'
import { resendForgotPasswordCode } from '../../library/redux/auth/forgotPassword/action'

const AuthResetPassword = ({state,dispatch}) =>{

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    if(!state.auth.isRequiredResetPassword && !state.auth.isForgotPassword){
        return <Redirect to="/auth/login"/>
    }else{

        var destination

        if(state.auth.data.CodeDeliveryDetails) destination = state.auth.data.CodeDeliveryDetails.Destination
        else destination = state.auth.formData.username

        return(
            <>
                <Helmet>
                    <title>Reset password</title>
                </Helmet>
                <Container id="container" fluid>
                    <div className="fullHeight d-flex flex-column justify-content-center align-items-center">
                        <Modal id="login"
                            show={true} backdrop={false}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header>
                                <Modal.Title as="h5">Reset Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Alert variant="success">
                                    <p className="font font-medium mb-0">
                                        A reset code has been sent to {destination}. Please check your Inbox and enter the code below.
                                    </p>    
                                </Alert>
                                <FormAuthResetPassword onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-between pt-2">
                                <div>
                                    <Button variant="link" size="sm" className="font-medium link pl-0" onClick={()=>dispatch(authLogout())}>back to Login page</Button>
                                </div>
                                <div>
                                    <Button variant="link" size="sm" className="font-medium link" onClick={()=>dispatch(resendForgotPasswordCode({username:destination}))}>Resend code</Button>
                                    <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('resetPasswordForm'))}>Reset password</Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Container>
            </>
        )
    }

}

export default AuthResetPassword