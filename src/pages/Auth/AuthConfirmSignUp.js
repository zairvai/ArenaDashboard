import React,{useState} from 'react'
import {Helmet} from 'react-helmet'
import {submit} from 'redux-form'
import {Modal,Container,Alert,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import { authLogout } from '../../library/redux/auth/signOut/action'
import FormAuthConfirmSignUp from '../../components/FormAuthConfirmSignUp'

const  AuthConfirmSignUp = ({dispatch,state,auth,...props}) => {

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    if(state.auth.isUserConfirmed === false){
        
        var delivery = state.auth.data.codeDeliveryDetails

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
                            <Modal.Title as="h5">Code Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert variant="success">
                            {delivery ? 
                                <p className="font font-medium mb-0">
                                    A confirmation code has been sent to {delivery.Destination}. Please check your Inbox and enter the code below.
                                </p>    
                             : <p className="font font-medium mb-0">Please enter the confirmation code below.</p>}
                            </Alert>

                            <FormAuthConfirmSignUp {...props} onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between pt-2">
                            <div>
                                <Button variant="link" size="sm" className="font-medium pl-0" onClick={()=>dispatch(authLogout())}>back to Login page</Button>
                            </div>
                            <div>
                                <Button variant="link" size="sm" className="font-medium link">Resend code</Button>
                                <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('confirmSignUpForm'))}>Confirm code</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </>
    }else{
        return <Redirect to="/auth/login"/>
    }

}

export default AuthConfirmSignUp