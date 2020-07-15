
import {watcher as listsSaga} from './list/saga'
import {watcher as createSaga} from './add/saga'
import {watcher as getSaga} from './get/saga'
import {watcher as updateSaga} from './update/saga'

export const watchAccountSaga = [
        listsSaga,
        createSaga,
        getSaga,
        updateSaga
    ]