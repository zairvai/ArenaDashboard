import React,{useState} from 'react'
import {Helmet} from 'react-helmet'
import {submit} from 'redux-form'
import {Modal,Container,Alert,Button} from 'react-bootstrap'
import {Redirect,NavLink} from 'react-router-dom'
import FormAuthForgotPassword from '../../components/FormAuthForgotPassword'

const  AuthForgotPassword = ({dispatch,state,...props}) => {

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    if(state.auth.isForgotPassword === true){
        return <Redirect to="/auth/reset_password"/>
    }
    else{
        return <>
            <Helmet>
                <title>{props.route.name}</title>
            </Helmet>
            <Container id="container" fluid>
                <div className="fullHeight d-flex flex-column justify-content-center align-items-center">
                    <Modal
                        show={true} backdrop={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header>
                            <Modal.Title as="h5">Password Recovery</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Alert variant="info">
                                <p className="font font-medium mb-0">Type your username below, to get instruction to reset password.</p>    
                            </Alert>

                            <FormAuthForgotPassword onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>

                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between pt-2">
                            <div>
                                <NavLink to="/auth/login">
                                    <Button variant="link" size="sm" className="font-medium link pl-0">back to Login page</Button>
                                </NavLink>
                            </div>

                            <div>
                                <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('forgotPasswordForm'))}>Recover my password</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </>
    }

}

export default AuthForgotPassword