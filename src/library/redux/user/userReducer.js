import userReducer from './getUserByUsername/reducer'

import {reduceReducers} from '../reduxHelper'

export default reduceReducers(
    userReducer
)
