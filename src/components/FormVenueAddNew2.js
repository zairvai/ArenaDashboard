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

    const onStartTimeChange = (item,value) => {
        // var open = `${item}.open`
        // var close = `${item}.close`

        // console.log(open)
        // console.log(close)

        // const options = getTimeOptions(value)

        // console.log(options)
 
        // props.change(close,value)
    }

    const dayOptions = [
        {value:"mon",text:"Monday"},
        {value:"tue",text:"Tuesday"},
        {value:"wed",text:"Wednesday"},
        {value:"thu",text:"Thursday"},
        {value:"fri",text:"Friday"},
        {value:"sat",text:"Saturday"},
        {value:"sun",text:"Sunday"}
    ]

    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>
                
                <Divider horizontal className="mb-5">
                    <Header as='h4'>Service Hours</Header>
                </Divider>

                <FieldArray name="serviceHours" dayOptions={dayOptions} component={FieldDateTimes} onStartTimeChange={onStartTimeChange.bind(this)}/>


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

