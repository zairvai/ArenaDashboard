import React,{useEffect,useState,useRef,lazy} from 'react'
import {Helmet} from 'react-helmet'
import {Row,Col} from 'react-bootstrap'
import {Button} from 'semantic-ui-react'
import {pageHeader} from '../components/Parts'
import {getMomentFormat,getStatusIcon} from '../utility/Helper'
import AccountController from '../library/controller/AccountController'
import ModalAccountAddNew from '../components/ModalAccountAddNew'
import ModalAccountDetail from '../components/ModalAccountDetail'

var moment = require('moment')

const Account = ({staticContext,...props}) => {

    const {state,dispatch,route} = props
    const [from,setFrom] = useState(0)
    const [size,setSize] = useState(50)

    const propsRef = useRef(props)
    const accountController = useRef(new AccountController(propsRef.current))

    useEffect(()=>{    

        if(!accountController.current.isInitiated()) accountController.current.listItems({orderBy:"createdAt",direction:"desc",from,size})    

    },[from,size])

    const openFormAdd = () => {
        accountController.current.showFormAdd()
    }
    const closeFormAdd = () => {
        accountController.current.closeFormAdd()
    }

    const openDetail = accountObject =>{
        accountController.current.showDetail(accountObject)
    }

    const closeDetail = () => {
        accountController.current.closeDetail()
    }

    const PageHeader = pageHeader( () =>
        <>
            
                <ul id="breadcrumb">
                    <li className="font active">
                        <span className="d-inline-block text">{route.name}</span>
                    </li>
                </ul>
                <div>
                    <Button size="medium" color="pink" onClick={openFormAdd.bind(this)}>Create account</Button>
                </div>
            
        </>
    )

    return (
        <>
            <Helmet>
                <title>{route.name}</title>
            </Helmet>

            <ModalAccountAddNew show={state.account.showFormAdd} onHide={()=>closeFormAdd()} {...props}/>
            <ModalAccountDetail show={state.account.showDetail} onHide={()=>closeDetail()} itemObject={state.account.item} {...props}/>

            <Row>
                <Col>
                    <PageHeader/>
                </Col>
            </Row>

            {
            
            Object.keys(state.account.items).length ? 

            <Row>
                <Col>
                    <div id="pageWrapper" style={{height:props.pageWrapperHeight}}>
                        <div id="pageContent">
                            <div className="list pb-3">
                            
                                <Row className="border-bottom py-3">
                                    <Col sm={3} md={6}>
                                        <div className="listHeader pl-3">Name</div>
                                    </Col>
                                    <Col sm={3} md={2}>
                                        <div className="listHeader">Last modified</div>
                                    </Col>
                                    <Col sm={3} md={2}>
                                        <div className="listHeader">Created at</div>
                                    </Col>
                                    <Col sm={3} md={2}>
                                        <div className="listHeader">Status</div>
                                    </Col>
                                </Row>

                                {
                                    Object.keys(state.account.items).map(key=>{
                                        const itemObject = state.account.items[key]
                                        
                                        return (
                                            <Row key={key} className="border-bottom pt-3 pb-2 userSelectNone">
                                                <Col sm={6} md={6} className="pl-3">
                                                    <div className="listItem">
                                                        <div onClick={openDetail.bind(this,itemObject)} className="cursorDefault font">
                                                            <div className="name d-flex flex-row align-items-center">
                                                                <div className="font-medium">{itemObject.getName()}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={3} md={2}>
                                                    <div className="listItem font-small" title={moment(itemObject.getUpdatedAt()).format('MMM D, Y [at] HH:mm')}>{getMomentFormat(itemObject.getUpdatedAt())}</div>
                                                </Col>
                                                <Col sm={3} md={2}>
                                                    <div className="listItem font-small" title={moment(itemObject.getCreatedAt()).format('MMM D, Y [at] HH:mm')}>{getMomentFormat(itemObject.getCreatedAt())}</div>
                                                </Col>
                                                <Col sm={3} md={2}>
                                                    <div className="listItem">{getStatusIcon(itemObject.getStatus())}</div>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            : ""
            }
        </>
    )

}

export default Account