import React from 'react'
import {Helmet} from 'react-helmet'
import {Row,Col} from 'react-bootstrap'
import {pageHeader} from '../components/Parts'

const Access = ({dispatch,state,auth,...props}) => {

    const{route} = props

    const PageHeader = pageHeader( () =>
        <>
            <ul id="breadcrumb">
                <li className="font active">
                    <span className="d-inline-block text">{route.name}</span>
                </li>
            </ul>
        </>
    )

    return (
        <>
            <Helmet>
                <title>{route.name}</title>
            </Helmet>
            <Row>
                <Col>
                    <PageHeader/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div id="pageWrapper" style={{height:props.pageWrapperHeight}}>
                        <div id="pageContent">
                            <div id="docList" className="list pb-3">
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )

}

export default Access