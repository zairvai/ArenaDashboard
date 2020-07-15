import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore} from 'redux-persist'
import {createLogger} from 'redux-logger'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'


const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];

if (process.env.REACT_APP_ENV === 'development') {
    middlewares.push(loggerMiddleware);
}

const store = createStore(rootReducer,applyMiddleware(...middlewares))
rootSaga.forEach(saga=> {
    sagaMiddleware.run(saga)
})

const persistor = persistStore(store)

const getPersistor = () => persistor
const getStore = () => store
const getState = () => {return store.getState()}

export {
    getStore,getState,getPersistor
}

export default {
    getStore,getState,getPersistor
}
