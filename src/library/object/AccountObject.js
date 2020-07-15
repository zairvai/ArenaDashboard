import BaseObject from './BaseObject'

class AccountObject extends BaseObject {

    constructor({id,name,status,updatedAt,createdAt,version}){
        super({id,name,status,updatedAt,createdAt,version})
    }

}

export default AccountObject