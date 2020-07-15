import React from 'react'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError} from 'redux-form'
import {Form} from 'react-bootstrap'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitResetPasswordPromiseCreator} from '../library/redux/auth/resetPassword/routine'
import validation from '../constant/inputFieldValidation'

const submit = async(values,dispatch,props) =>{

    const promise = props.submitForgotPasswordPromiseCreator({values})
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

    errors.code = validation.validate("Reset code",values.code,{required:true})
    errors.username = validation.validate("Email",values.username,{required:true,email:true,minLen:10})
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

var FormResetPassword = props => {
            
    const {handleSubmit,error,submitting,valid} = props

    const {onValidate,onSubmitting} = props

    onValidate(valid)
    onSubmitting(submitting)

    return(
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>
                
                <Form.Group>
                    <Field name="username" type="hidden"  component={FieldInput}/>
                </Form.Group>

                <Form.Group>
                    <Field name="code" type="number"  component={FieldInput} label="Reset code"/>
                </Form.Group>

                <Form.Group>
                    <Field name="password" type="password"  component={FieldInput} label="New password"/>
                </Form.Group>
                <Form.Group>
                    <Field name="confirmPassword" type="password"  component={FieldInput} label="Confirm new password"/>
                </Form.Group>
            </Form>
        </>
    )
}

FormResetPassword = reduxForm({
    form:"resetPasswordForm",
    validate,
    onSubmit:submit,
    destroyOnUnmount:true
})(FormResetPassword)

export default connect(
    state=>({
        initialValues : state.auth.formData
    }),
    dispatch=>({
    ...bindPromiseCreators({submitResetPasswordPromiseCreator},dispatch),dispatch
    }))(FormResetPassword)