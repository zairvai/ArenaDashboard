
import React from 'react'
import SidebarMenuItem from '../components/sidebar/MenuItem'
import {Row,Col,Image} from 'react-bootstrap'
import logo from '../images/logo-200.png' 
import {Link} from 'react-router-dom'

const Sidebar = props => {

    const {dispatch,state} = props

    return (
        <>

            <div className="d-flex justify-content-center mb-3">
                <Link to="/app"><Image src={logo} width={120}/></Link>
            </div>
            <Row className="mb-3 mx-3">
                <Col className="d-flex flex-row">
                    
                </Col>
            </Row>
    
            {
                props.route.routes.map((route,index)=>{
                    if(route.group && route.group.sidebarMenu1)  return (<SidebarMenuItem key={index} route={route}/>)
                    return false
                })
            }

            <Row className="my-3">
                <Col className="d-flex flex-row horizontalBorder"></Col>
            </Row>

            {
                props.route.routes.map((route,index)=>{
                    if(route.group && route.group.sidebarMenu2)  return (<SidebarMenuItem key={index} route={route}/>)
                    return false
                })
            }


            <Row className="my-3">
                <Col className="d-flex flex-row horizontalBorder"></Col>
            </Row>

            {
                props.route.routes.map((route,index)=>{
                    if(route.group && route.group.sidebarMenu3)  return (<SidebarMenuItem key={index} route={route}/>)
                    return false
                })
            }

            <Row className="my-3">
                <Col className="d-flex flex-row horizontalBorder"></Col>
            </Row>

            {
                props.route.routes.map((route,index)=>{
                    if(route.group && route.group.sidebarMenu4)  return (<SidebarMenuItem key={index} route={route}/>)
                    return false
                })
            }
            
        </>
    )
}

export default Sidebar