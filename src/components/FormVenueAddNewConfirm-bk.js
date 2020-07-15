import React,{useState} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field,reduxForm,SubmissionError,submit,change} from 'redux-form'
import {Form,Row,Col,Modal,Button} from 'react-bootstrap'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitCreateVenuePromiseCreator} from '../library/redux/venue/add/routine'
import {GoogleMap} from './GoogleMap'
import validation from '../constant/inputFieldValidation'
import {FieldInput,FieldMap} from './RenderFields'

const submitValues = async(values,dispatch,props) =>{

    return new Promise((resolve,reject)=>{

        console.log('test')
        resolve(true)
    })

    // const promise = props.submitCreateVenuePromiseCreator({values})
    // return promise.then(
    //             (success=>{
    //                 console.log(success)
    //             }),
    //             (failure=>{
    //                 throw new SubmissionError({
    //                     _error:failure.error.message
    //                 })
    //             }))
}

const validate = values => {

    const errors = {}

    // errors.name = validation.validate("Venue name",values.name,{required:true,minLen:5})
    // errors.location = validation.validate("Location",values.location,{required:true})
    // errors.address = validation.validate("Venue address",values.address,{required:true,minLen:20,maxLen:300})
    
    return errors

}

let FormVenueAddNew = props =>{
    
    const {handleSubmit,error,submitting,valid} = props

    const {onValidate,onSubmitting} = props

    onValidate(valid)
    onSubmitting(submitting)   

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit} >

                <Form.Group as={Row}>
                    <Col sm={12}>
                        <Field name="name" autoComplete="off" type="text" component={FieldInput} label="Venue name eg; Arena Sport Center"/>
                    </Col>
                </Form.Group>
    
                <Form.Group as={Row}>
                    <Col sm={12}>
                        <Form.Text className="text-muted font-small mb-1">After selecting the location in the map, you may edit this field to the exact address of your venue.</Form.Text>
                        <Field name="address" as="textarea" rows="3" autoComplete="new-address" type="text" component={FieldInput} label="You must select location from the map to set address"/>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}


FormVenueAddNew =  reduxForm({
    form:"formVenueAddNew",
    validate,
    onSubmit:submitValues,
    enableReinitialize:true,
    destroyOnUnmount:false,
    forceUnregisterOnUnmount:true
})(FormVenueAddNew)


FormVenueAddNew = connect(
    state=>({
        initialValues:state.venue.item
    }),
    dispatch=>({
    ...bindPromiseCreators({submitCreateVenuePromiseCreator},dispatch),
    ...bindActionCreators({change},dispatch)
}))(FormVenueAddNew)


let FormWrapper = ({onCancel=false,onSubmit,previousPage,dispatch}) => {

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title as="h6">Create venue - Step 3</Modal.Title>
            </Modal.Header>
            <Modal.Body>    
                <FormVenueAddNew onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)}/>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between pt-2">          
                <Button variant="link" size="sm" className="font-medium link" onClick={onCancel} >Cancel</Button>
                <div>
                    <Button type="button" variant="secondary" size="sm" className="ml-2" onClick={previousPage}>Previous page</Button>
                    <Button type="button" variant="secondary" size="sm" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('formVenueAddNew'))}>Next page</Button>
                </div>
            </Modal.Footer>
        </>
    )

}

export default connect(state=>({state}),dispatch=>({dispatch}))(FormWrapper)