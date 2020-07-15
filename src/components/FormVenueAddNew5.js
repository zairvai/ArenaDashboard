import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {bindPromiseCreators} from 'redux-saga-routines'
import {submitCreateVenuePromiseCreator} from '../library/redux/venue/add/routine'
import {Field,FieldArray,reduxForm,submit,change} from 'redux-form'
import {Form,Divider,Header,Button,Segment,Icon, Card,Placeholder,Image} from 'semantic-ui-react'
import {TextLink} from './Parts'
import {FieldInput,FieldMap,FieldTextArea,FieldDateTimes,FieldContacts,FieldSocialMedias} from './RenderFields'
import {useDropzone} from 'react-dropzone'
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
    const [files,setFiles] = useState([])
    const {onValidate} = props
    onValidate(valid)

    const {getRootProps,getInputProps} = useDropzone({
        accept: "image/png,image/jpeg",
        onDrop: acceptedFiles => {
            console.log(files)
            setFiles(acceptedFiles.map(file=>Object.assign(file,{
                preview:URL.createObjectURL(file)
            })))
        }
    })

    

    const thumbs = files.map(file=>
        <Card  key={file.name}>
            <Card.Content>
                <Image src={file.preview} centered verticalAlign="middle"/>
            </Card.Content>
        </Card>
    )

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]);
    
    return (
        <>
            {error && <div className="d-flex justify-content-start align-items-center pb-2"><div className="text-danger font-medium">{error}</div></div>}
            <Form onSubmit={handleSubmit}>
                <div {...getRootProps({className:"dropzone"})}>
                    <Segment placeholder>
                        <Header icon size="small" className="text">
                            Drag 'n' drop some files here, or click to select files
                        </Header>
                        <input {...getInputProps()}/>
                        
                    </Segment>
                </div>
                <Card.Group itemsPerRow={3} className=" mt-3">
                    {thumbs}
                </Card.Group>
                
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

