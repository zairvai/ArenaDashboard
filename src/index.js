import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from './routes'

import {Provider} from 'react-redux'
import {getStore,getPersistor} from './library/redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import 'semantic-ui-css/semantic.min.css'

import Loading from './components/Loading'

import './style.scss'

ReactDOM.render((
        <Provider store={getStore()}>
            <PersistGate persistor={getPersistor()} loading={<Loading/>}>
                <Router>{renderRoutes(routes)}</Router>
            </PersistGate>
        </Provider>
    ),document.getElementById("root"))
