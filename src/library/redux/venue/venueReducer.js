import {reduceReducers} from '../reduxHelper'

import listReducer from './list/reducer'
import createReducer from './add/reducer'
// import getReducer from './get/reducer'
// import updateReducer from './update/reducer'

export default reduceReducers(
    listReducer,
    createReducer
    // createReducer,
    // getReducer,
    // updateReducer
)
