import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitCreateVenuePromiseCreator} from '../library/redux/venue/add/routine'
import {Field,FieldArray,reduxForm,submit,change} from 'redux-form'
import {Form,Divider,Header,Button} from 'semantic-ui-react'
import {TextLink} from './Parts'
import {FieldInput,FieldMap,FieldTextArea} from './RenderFields'
import validation from '../constant/inputFieldValidation'

const validate = values => {

    const errors = {}

    errors.name = validation.validate("Venue name",values.name,{required:true,minLen:5})
    errors.location = validation.validate("Location",values.location,{required:true})
    errors.address = validation.validate("Venue address",values.address,{required:true,minLen:20,maxLen:300})
    
    return errors

}

let FormVenueAddNew = props =>{
    
    const {handleSubmit,error,submitting,valid} = props  
    const {onValidate} = props
    onValidate(valid)

    const onMapSelected = place => {
        
        props.change("address",place.address)
        if(place.name) props.change("name",place.name)
    }

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>

                <Divider horizontal className="mb-5">
                    <Header as='h4'>Venue details &amp; Location</Header>
                </Divider>

                <Field name="location" autoComplete="new-location" component={FieldMap} onSelected={onMapSelected.bind(this)} label={"Set venue on the map"} placeholder="Type here to find your location"/>
                            
                <Field name="name" autoComplete="new-venue" type="text" component={FieldInput} label="Venue name" placeholder="Venue name eg; Arena Sport Center"/>
                <Field name="address" rows="3" autoComplete="new-address" component={FieldTextArea} label="Venue address" placeholder="You must select location from the map to set address"/>
                

            </Form>
        </>
    )
}


export default reduxForm({
    form:"formVenueAddNew",
    validate,
    enableReinitialize:true,
    destroyOnUnmount:false,
    forceUnregisterOnUnmount:true
})(FormVenueAddNew)

