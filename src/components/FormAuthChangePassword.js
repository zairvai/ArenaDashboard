import React from 'react'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError} from 'redux-form'
import {Form} from 'react-bootstrap'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitChangePasswordPromiseCreator} from '../library/redux/auth/changePassword/routine'
import validation from '../constant/inputFieldValidation'

const submit = async(values,dispatch,props) =>{

    const promise = props.submitChangePasswordPromiseCreator({values})
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

const validate = values =>{

    const errors = {}

    errors.currentPassword = validation.validate("Current Password",values.currentPassword,{required:true})
    errors.password = validation.validate("Password",values.password,{required:true,password:true,minLen:8})
    errors.confirmPassword = validation.validate("Confirm password",values.confirmPassword,{required:true,equalTo:{fieldName:"Password",value:values.password}})
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

var FormChangePassword = props => {
            
    const {handleSubmit,error,submitting,valid} = props

    const {onValidate,onSubmitting} = props

    onValidate(valid)
    onSubmitting(submitting)

    return(
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>
               
                <Form.Group>
                    <Field name="currentPassword" type="password" autoComplete="new-password" component={FieldInput} label="Current password"/>
                </Form.Group>    
                <Form.Group>
                    <Field name="password" type="password"  autoComplete="new-password" component={FieldInput} label="New password"/>
                </Form.Group>
                <Form.Group>
                    <Field name="confirmPassword" type="password" autoComplete="new-password"  component={FieldInput} label="Confirm new password"/>
                </Form.Group>
                
            </Form>
        </>
    )
}

FormChangePassword = reduxForm({
    form:"changePasswordForm",
    validate,
    onSubmit:submit,
    destroyOnUnmount:true
})(FormChangePassword)

export default connect(
    state=>({}),
    dispatch=>({
    ...bindPromiseCreators({submitChangePasswordPromiseCreator},dispatch),dispatch
    }))(FormChangePassword)