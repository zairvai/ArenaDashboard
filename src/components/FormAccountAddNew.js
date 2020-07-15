import React from 'react'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError} from 'redux-form'
import {Form} from 'react-bootstrap'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitCreateAccountPromiseCreator} from '../library/redux/account/add/routine'
import validation from '../constant/inputFieldValidation'

const submit = async(values,dispatch,props) =>{

    const promise = props.submitCreateAccountPromiseCreator({values})
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

    errors.name = validation.validate("Account name",values.name,{required:true,minLen:5})
    
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


let FormAccountAddNew = props =>{
    
    const {handleSubmit,error,submitting,valid} = props

    const {onValidate,onSubmitting} = props

    onValidate(valid)
    onSubmitting(submitting)    

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Field name="name" autoComplete="off" type="text" component={FieldInput} label="Account name eg; Arena Sport Center"/>
                </Form.Group>
            
            </Form>
        </>
    )
}


FormAccountAddNew =  reduxForm({
    form:"formAccountAddNew",
    validate,
    onSubmit:submit,
    destroyOnUnmount:true
})(FormAccountAddNew)


export default connect(
    state=>({}),
    dispatch=>({
    ...bindPromiseCreators({submitCreateAccountPromiseCreator},dispatch),dispatch
    }))(FormAccountAddNew)
