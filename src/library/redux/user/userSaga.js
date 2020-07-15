import {watcher as getUserByUsernameSaga} from './getUserByUsername/saga'
// import {routinePromiseWatcherSaga} from 'redux-saga-routines'
export const watchUserSaga = [
        getUserByUsernameSaga   
    ]