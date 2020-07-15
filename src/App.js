import React,{useState,useCallback,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import {getPageWrapperHeight} from './utility/Helper'
import {connect} from 'react-redux'
import {bindPromiseCreators} from 'redux-saga-routines'
import {getListAccountsPromiseCreator} from './library/redux/account/list/routine'
import {Redirect} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

const App = props => {
    
    const {dispatch,state} = props

    const [dimension, setDimension] = useState({height:window.innerHeight,width:window.innerWidth})
    const [pageWrapperHeight, setPageWrapperHeight] = useState(getPageWrapperHeight())
    
    const onResize = useCallback(()=>{
        setDimension({
            height:window.innerHeight,
            width:window.innerWidth
        })
        setPageWrapperHeight(getPageWrapperHeight())
    },[])

    useEffect(()=>{

        window.addEventListener("resize",onResize)
        
        return ()=>{
            window.removeEventListener("resize",onResize)
        }

    },[onResize])

    var isLoggedIn = state.auth.isLoggedIn

    if(isLoggedIn){
        return (
            <>
                <Container id="container" fluid>
                    <Row className="fullHeight">
                        <Col lg={12}>
                            <div id="sidebar" md={2} className="fullHeight d-flex flex-column py-3" style={{height:dimension.height}}>
                                <div className="fullHeight">
                                    <Sidebar {...props}/>
                                </div>
                            </div>
                            <div id="main">
                                <div id="header" className="pt-3 pb-3 d-flex justify-content-between">
                                    <Header {...props}/>
                                </div>
                                <div id="content">
                                    {renderRoutes(props.route.routes,{state,dispatch,pageWrapperHeight,...props})}
                                </div>
        
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }else{
        return <Redirect to="/auth/login"/>
    }

}

const mapStateToProps = state => {
    return{
        state
    }
}

const mapDispatchToProps = dispatch =>({
    ...bindPromiseCreators({getListAccountsPromiseCreator},dispatch),dispatch
})

export default connect(mapStateToProps,mapDispatchToProps)(App)