import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitCreateVenuePromiseCreator} from '../library/redux/venue/add/routine'
import {Field,FieldArray,reduxForm,submit,change} from 'redux-form'
import {Form,Divider,Header,Button} from 'semantic-ui-react'
import {TextLink} from './Parts'
import {FieldInput,FieldMap,FieldTextArea,FieldDateTimes,FieldContacts,FieldSocialMedias} from './RenderFields'
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

    const contactOptions = [
        {value:"office",text:"Office"},
        {value:"fax",text:"Fax"},
        {value:"mobile",text:"Mobile"},
        {value:"whatsapp",text:"WhatsApp"},
        {value:"email",text:"Email"}
    ]

    const socialMediaOptions = [
        {value:"fb",text:"Facebook"},
        {value:"ig",text:"Instagram"},
        {value:"tw",text:"Twitter"},
        {value:"yt",text:"Youtube"}
    ]

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>

                <Divider horizontal className="mb-5">
                    <Header as='h4'>Contacts</Header>
                </Divider>

                <FieldArray name="contacts" contactOptions={contactOptions} component={FieldContacts}/>

                <Divider horizontal className="my-5">
                    <Header as='h4'>Social Media</Header>
                </Divider>

                <FieldArray name="socialMedia" socialMediaOptions={socialMediaOptions} component={FieldSocialMedias}/>

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

