import React,{useState,useRef,lazy} from 'react'
import {submit} from 'redux-form'
import {Modal} from 'react-bootstrap'
import {Button} from 'semantic-ui-react'
import {TextLink} from './Parts'
import FormAccountDetail from './FormAccountDetail'
import LazyLoad from '../components/LazyLoad'
import AccountController from '../library/controller/AccountController'

const lazyFormAccountEdit = lazy(()=>import('../components/FormAccountEdit'))
const FormAccountEdit = props => <LazyLoad component={lazyFormAccountEdit} {...props}/>

export default ({itemObject,show,onHide=false,...props}) => {

    const {dispatch,state} = props

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)
    const [pristine,setPristine] = useState(false)

    const propsRef = useRef(props)
    const accountController = useRef(new AccountController(propsRef.current))

    function hide(){
        if(onHide && typeof onHide === 'function') {
            accountController.current.closeFormUpdate()
            onHide()
        }
    }


    if(!state.account.showFormUpdate){
        return (
            <Modal onHide={hide} show={show} keyboard={false} backdrop={true} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h6">Account Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAccountDetail itemObject={itemObject}/>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-end pt-2">          
                    <div>
                        <TextLink size="sm" className="font-medium link pl-0" onClick={()=>accountController.current.closeDetail()} >Close</TextLink>
                        <Button color="pink" size="medium" className="ml-2" onClick={()=>accountController.current.showFormUpdate()} >Edit</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }else{

        return (
            <Modal onHide={hide} show={show} keyboard={false} backdrop={true} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h6">Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAccountEdit onValidate={setValid.bind(this)} onSubmitting={setSubmitting.bind(this)} onPristine={setPristine.bind(this)}/>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-end pt-2">          
                    <div>
                        <TextLink size="sm" className="font-medium link pl-0" onClick={()=>accountController.current.closeFormUpdate()} >Cancel</TextLink>
                        <Button color="pink" size="medium" className="ml-2" disabled={!valid || pristine || submitting} onClick={()=>dispatch(submit('formAccountEdit'))}>Save changes</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}