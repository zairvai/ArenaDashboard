import registerReducer from './signUp/reducer'
import resendSignUpReducer from './resendSignUp/reducer'
import confirmSignUpReducer from './confirmSignUp/reducer'
import forgotPasswordReducer from './forgotPassword/reducer'
import loginReducer from './signIn/reducer'
import logoutReducer from './signOut/reducer'
import completePasswordReducer from './completeNewPassword/reducer'
import resetPasswordReducer from './resetPassword/reducer'
import {reduceReducers} from '../reduxHelper'

export default reduceReducers(
    registerReducer,
    resendSignUpReducer,
    confirmSignUpReducer,
    forgotPasswordReducer,
    loginReducer,
    logoutReducer,
    completePasswordReducer,
    resetPasswordReducer
)
