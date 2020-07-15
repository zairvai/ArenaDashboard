import React,{useState} from 'react'
import {submit} from 'redux-form'
import {Modal} from 'react-bootstrap'
import {Button,Icon} from 'semantic-ui-react'
import {TextLink} from './Parts'
import FormVenueAddNew1 from './FormVenueAddNew1'
import FormVenueAddNew2 from './FormVenueAddNew2'
import FormVenueAddNew3 from './FormVenueAddNew3'
import FormVenueAddNew4 from './FormVenueAddNew4'
import FormVenueAddNew5 from './FormVenueAddNew5'

export default ({show,onHide=false,dispatch}) => {

    const [valid,setValid] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    const [page,setPage] = useState(5)

    const nextPage = () => {
        setPage(page+1)
    }

    const previousPage = () => {
        setPage(page-1)
    }

    const hide = () =>{
        onHide()
        setTimeout(()=>setPage(1),1000)
    }

    return (
        <Modal size="lg" onHide={hide.bind(this)} show={show} keyboard={false} backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title as="h6">Create new venue</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>    
                {page===1 && <FormVenueAddNew1 onValidate={setValid.bind(this)} onSubmit={nextPage}/>}
                {page===2 && <FormVenueAddNew2 onValidate={setValid.bind(this)} previousPage={()=>previousPage()} onSubmit={nextPage}/>}
                {page===3 && <FormVenueAddNew3 onValidate={setValid.bind(this)} previousPage={()=>previousPage()} onSubmit={nextPage}/>}
                {page===4 && <FormVenueAddNew4 onValidate={setValid.bind(this)} previousPage={()=>previousPage()} onSubmit={nextPage}/>}
                {page===5 && <FormVenueAddNew5 onValidate={setValid.bind(this)} previousPage={()=>previousPage()} onSubmit={nextPage}/>}
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-end">
                {(page === 2 || page === 3 || page === 4 || page === 5) && <Button color="blue" size="medium" className="ml-2" onClick={()=>previousPage()}><Icon name="left chevron"/> Previous</Button>}
                {(page === 1 || page === 2 || page === 3 || page === 4 || page === 5) && <Button color="pink" size="medium" className="ml-2" disabled={!valid || submitting} onClick={()=>dispatch(submit('formVenueAddNew'))}>Next <Icon name="right chevron"/></Button>}
            </Modal.Footer>
        </Modal>
    )
}