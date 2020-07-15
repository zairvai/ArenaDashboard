import {routinePromiseWatcherSaga} from 'redux-saga-routines'
import {watchAuthSaga} from './auth/authSaga'
import {watchUserSaga} from './user/userSaga'
import {watchAccountSaga} from './account/accountSaga'
import {watchVenueSaga} from './venue/venueSaga'

export default [
    ...watchAuthSaga,
    ...watchUserSaga,
    ...watchAccountSaga,
    ...watchVenueSaga,
    routinePromiseWatcherSaga
]