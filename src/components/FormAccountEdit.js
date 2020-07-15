import React from 'react'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError} from 'redux-form'
import {Form,Row,Col} from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitUpdateAccountPromiseCreator} from '../library/redux/account/update/routine'
import validation from '../constant/inputFieldValidation'

const submit = async(values,dispatch,props) =>{

    const promise = props.submitUpdateAccountPromiseCreator({values})
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

const FieldSwitch = ({input,label,type,meta:{asyncValidating,touched,error},...rest})=>{

    const {value,onChange} = input

    return (
        <>
            <BootstrapSwitchButton
                checked={value}
                onlabel='On' offlabel='Off'
                onstyle="success" offstyle="danger"
                size="sm"
                onChange={(checked) => {
                    onChange(checked)
                }}
            />
            <Field {...rest} {...input} autoComplete="off" type="hidden" component={FieldInput}/>
        </>
    )

}


let FormAccountAddNew = props =>{
    
    const {handleSubmit,error,submitting,valid,pristine} = props

    const {onValidate,onSubmitting,onPristine} = props

    onValidate(valid)
    onSubmitting(submitting)   
    onPristine(pristine) 

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit} >
                <Form.Group as={Row}>
                    <Form.Label className="font-medium" column sm={2}>Name</Form.Label>
                    <Col sm={10}>
                        <Field name="name" autoComplete="off" type="text" component={FieldInput} label="Account name eg; Arena Sport Center"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label className="font-medium" column sm={2}>Status</Form.Label>
                    <Col sm={10} className="d-flex align-items-center">
                        <Field name="status" component={FieldSwitch} onChange={(e,newValue,prevValue)=>console.log(newValue)}/>
                    </Col>
                </Form.Group>
                <div>
                    <Field name="version" component={FieldInput} type="hidden"/>
                </div>
            
            </Form>
        </>
    )
}

FormAccountAddNew =  reduxForm({
    form:"formAccountEdit",
    validate,
    onSubmit:submit,
    destroyOnUnmount:true
})(FormAccountAddNew)


export default connect(
    state=>({
        initialValues:state.account.item
    }),
    dispatch=>({
    ...bindPromiseCreators({submitUpdateAccountPromiseCreator},dispatch),dispatch
    }))(FormAccountAddNew)
