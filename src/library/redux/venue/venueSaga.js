
import {watcher as listSaga} from './list/saga'
import {watcher as createSaga} from './add/saga'
// import {watcher as getSaga} from './get/saga'
// import {watcher as updateSaga} from './update/saga'

export const watchVenueSaga = [
        listSaga,
        createSaga,
        // getSaga,
        // updateSaga
    ]