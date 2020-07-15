import {reduceReducers} from '../reduxHelper'
// import {combineReducers} from 'redux'

import listsReducer from './list/reducer'
import createReducer from './add/reducer'
import getReducer from './get/reducer'
import updateReducer from './update/reducer'

export default reduceReducers(
    listsReducer,
    createReducer,
    getReducer,
    updateReducer
)

// export default combineReducers({
//     list:listItemsReducer,
//     add:createReducer
// })