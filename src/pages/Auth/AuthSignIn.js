import React,{useState} from 'react'
import {Helmet} from 'react-helmet'
import {submit} from 'redux-form'
import {Modal,Container,Button} from 'react-bootstrap'
import {Redirect,NavLink} from 'react-router-dom'
import FormAuthSignIn from '../../components/FormAuthSignIn'

const AuthSignIn = ({state,dispatch,...props}) =>{

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    if(state.auth.isUserConfirmed === false){
        return <Redirect to="/auth/confirm_signup"/>
    }
    else if(state.auth.isRequiredNewPassword){
        return <Redirect to="/auth/require_new_password"/>
    }
    else if(state.auth.isRequiredResetPassword){
        return <Redirect to="/auth/reset_password"/>
    }
    else{
        
        return(
            <>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <Container id="container" fluid>
                    <div className="fullHeight d-flex flex-column justify-content-center align-items-center">
                        <Modal id="login"
                            show={true} backdrop={false}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header>
                                <Modal.Title as="h5">Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormAuthSignIn {...props} onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-between pt-2">
                                
                                <div>
                                    <NavLink to="/auth/register">
                                        <Button variant="link" size="sm" className="font-medium link pl-0">Create new Account</Button>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/auth/forgot_password">
                                        <Button variant="link" size="sm" className="font-medium link">Forgot password?</Button>
                                    </NavLink>
                                    <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('loginForm'))}>Login</Button>
                                </div>
                                
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Container>
            </>
        )
    }

}

export default AuthSignIn