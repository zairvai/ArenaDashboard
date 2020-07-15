import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import Icon from 'react-web-vector-icons'
import {NavLink} from 'react-router-dom'

export default props => (
    <Row>
        <NavLink to={props.route.url} className="sidebarMenu" activeClassName="active">
            <Col className="wrapper d-flex flex-row">
                <Button size="md" variant="link">
                    <span className="label d-flex flex-row justify-content-center align-items-center pl-1">
                        <Icon
                            className="icon"
                            name={props.route.icon.name}
                            font={props.route.icon.font}
                            size={props.route.icon.size || 22}/>
                        <span className="font font-medium ml-3">{props.route.name}</span>
                    </span>
                </Button>
            </Col>
        </NavLink>
    </Row>
)