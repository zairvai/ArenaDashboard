
//import {watcher as invalidateSaga} from './invalidate/saga'
import {watcher as registerSaga} from './signUp/saga'
import {watcher as resendSignUpSaga} from './resendSignUp/saga'
import {watcher as confirmSignUpSaga} from './confirmSignUp/saga'
import {watcher as forgotPasswordSaga} from './forgotPassword/saga'
import {watcher as loginSaga} from './signIn/saga'
import {watcher as logoutSaga} from './signOut/saga'
import {watcher as resetPasswordSaga} from './resetPassword/saga'
import {watcher as completePasswordSaga} from './completeNewPassword/saga'

export const watchAuthSaga = [
        //invalidateSaga,
        registerSaga,
        resendSignUpSaga,
        confirmSignUpSaga,
        forgotPasswordSaga,
        loginSaga,
        logoutSaga,
        resetPasswordSaga,
        completePasswordSaga
    ]