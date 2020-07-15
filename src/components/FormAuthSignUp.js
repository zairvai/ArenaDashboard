import React from 'react'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError} from 'redux-form'
import {Form,InputGroup} from 'react-bootstrap'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitRegisterPromiseCreator} from '../library/redux/auth/signUp/routine'
import {getUserPromiseCreator} from '../library/redux/user/getUserByUsername/routine'
import validation from '../constant/inputFieldValidation'

const submit = async(values,dispatch,props) =>{

    const promise = props.submitRegisterPromiseCreator({values})
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

const validate = values => {

    const errors = {}

    errors.accountName = validation.validate("Account name",values.accountName,{required:true,minLen:5})
    errors.username = validation.validate("Email",values.username,{required:true,email:true,minLen:10})
    errors.password = validation.validate("Password",values.password,{required:true,password:true,minLen:8})
    errors.confirmPassword = validation.validate("Confirm password",values.confirmPassword,{required:true,equalTo:{fieldName:"Password",value:values.password}})
    errors.phoneNumber = validation.validate("Mobile number",values.phoneNumber,{required:true,mobile:true,minLen:10,maxLen:14})
    return errors

}

const asyncValidate = (values,dispatch,props) =>{

    if(values.username){

        return new Promise((resolve,reject)=>{
            const promise = props.getUserPromiseCreator({username:values.username})
        
            promise.then(
                    (successPayload=>reject({username:`${values.username} already taken`})),
                    (failurePayload=>resolve(true)))
    
        })
        
    }

    return new Promise((resolve)=>{resolve(true)})
    
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


var FormRegister = props =>{
    
    const {handleSubmit,error,submitting,valid} = props

    const {onValidate,onSubmitting} = props

    onValidate(valid)
    onSubmitting(submitting)

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit} >

                <Form.Group>
                    <Field name="accountName" autoComplete="off" type="text" component={FieldInput} label="Account name eg; Arena Sport Center"/>
                </Form.Group>

                <Form.Group>
                    <Field name="username" autoComplete="username" type="text" component={FieldInput} label="Email eg; johndoe@arenasport.id"/>
                </Form.Group>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>+62</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Field name="countryCode" type="hidden" component={FieldInput}/>
                    <Field name="phoneNumber" type="number" component={FieldInput} label="Mobile Phone eg; 8123456789"/>
                    
                </InputGroup>
                
                <Form.Group>
                    <Field name="password" type="password" autoComplete="new-password" component={FieldInput} label="Password"/>
                </Form.Group>

                <Form.Group>
                    <Field name="confirmPassword" autoComplete="new-password" type="password" component={FieldInput} label="Confirm password"/>
                </Form.Group>
                
            
            </Form>
        </>
    )
}


FormRegister = reduxForm({
    form:"registerForm",
    validate,
    asyncValidate,
    asyncChangeFields:["username"],
    initialValues:{
        countryCode:"+62"
    },
    onSubmit:submit,
    destroyOnUnmount:true
})(FormRegister)

export default connect(
    state=>({}),
    dispatch=>({
    ...bindPromiseCreators({submitRegisterPromiseCreator,getUserPromiseCreator},dispatch),dispatch
    }))(FormRegister)