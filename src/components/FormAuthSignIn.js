import React from 'react'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError} from 'redux-form'
import {Form} from 'react-bootstrap'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitLoginPromiseCreator} from '../library/redux/auth/signIn/routine'

const submit = async(values,dispatch,props) =>{

    const promise = props.submitLoginPromiseCreator({values})
    return promise.then(
                (success=>{
                    console.log(success)
                }),
                (failure=>{
                    throw new SubmissionError({
                        _error:failure.error.message
                    })
                }))
}

const validate = (values) =>{

    const errors = {}

    if(!values.username) {
        errors.username = "Please type in your username/email."
    }

    if(!values.password){
        errors.password = "Please type in your password."
    }

    return errors
}

const FieldInput = ({input,label,type,meta:{asyncValidating,touched,error},...rest})=>{

    
    if(touched && error)
        return(
            <>    
                <Form.Control {...rest} {...input} size="lg" type={type} className={asyncValidating ? 'async-validating font-medium':'font-medium'} 
                    autoComplete="off" placeholder={label} isInvalid/>

                {touched && (error && <Form.Control.Feedback type="invalid" className="d-block">{error}</Form.Control.Feedback>)}
            </>
        )
    else if(touched && !error) return <Form.Control {...rest} {...input} size="lg" type={type} className={asyncValidating ? 'async-validating font-medium':'font-medium'} placeholder={label} isValid/>
    else return <Form.Control {...rest} {...input} size="lg" type={type} className={asyncValidating ? 'async-validating font-medium':'font-medium'} placeholder={label}/>
            
}

var FormLogin = props => {

    const {handleSubmit,error,submitting,valid} = props
    const {onValidate,onSubmitting} = props

    onValidate(valid)
    onSubmitting(submitting)

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Field name="username" type="text" autoComplete="username" component={FieldInput} label="Email"/>
                </Form.Group>
                <Form.Group>
                    <Field name="password" type="password" autoComplete="current-password" component={FieldInput} label="Password"/>
                </Form.Group>
                
                
            
            </Form>
        </>
    )
}


FormLogin = reduxForm({
    form:"loginForm",
    validate,
    onSubmit:submit
})(FormLogin)


export default connect(
    state=>({}),
    dispatch=>({
    ...bindPromiseCreators({submitLoginPromiseCreator},dispatch),dispatch
    }))(FormLogin)