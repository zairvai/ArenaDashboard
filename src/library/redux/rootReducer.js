import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {reducer as formReducer} from 'redux-form'
import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'
import accountReducer from './account/accountReducer'
import venueReducer from './venue/venueReducer'

// const rootPersistConfig = {
//     key:'root',
//     storage:storage,
//     blacklist:['auth','storage','ux']
// }

const authPersistConfig = {
    key:'auth',
    storage:storage,
    //whitelist:['isLoggedIn'],
    blacklist:['_persist']
}

// const breadcrumbConfig = {
//     key:"bread",
//     storage:storage
// }

// const storagePersistConfig = {
//     key:'storage',
//     storage:storage,
//     whitelist:[],
//     //blacklist:['uploadQueue','uploadContainerVisibility']
// }

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig,authReducer),
    user: userReducer,
    account: accountReducer,
    venue: venueReducer,
    form: formReducer
})


//const persistedReducer = persistReducer(rootPersistConfig,rootReducers)

export default rootReducer