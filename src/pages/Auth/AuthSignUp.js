import React,{useState} from 'react'
import {Helmet} from 'react-helmet'
import {submit} from 'redux-form'
import {Modal,Container,Button} from 'react-bootstrap'
import {Redirect,NavLink} from 'react-router-dom'
import FormAuthSignUp from '../../components/FormAuthSignUp'

const  AuthSignUp = ({dispatch,state,auth,...props}) => {

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    if(state.auth.isUserConfirmed === false){
        return <Redirect to="/auth/confirm_signup"/>
    }
    else{
        return <>
            <Helmet>
                <title>{props.route.name}</title>
            </Helmet>
            <Container id="container" fluid>
                <div className="fullHeight d-flex flex-column justify-content-center align-items-center">
                    <Modal id="register"
                        show={true} backdrop={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header>
                            <Modal.Title as="h5">Register new Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormAuthSignUp {...props} onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between pt-2">
                                
                            <div>
                                <NavLink to="/auth/login">
                                    <Button variant="link" size="sm" className="font-medium link pl-0">back to Login page</Button>
                                </NavLink>
                            </div>
                            <div>
                                <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('registerForm'))}>Create new Account</Button>
                            </div>
                            
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </>
    }
}

export default AuthSignUp