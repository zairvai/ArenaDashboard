import BaseObject from './BaseObject'

class UserObject extends BaseObject{

    constructor({id,name,status,updatedAt,createdAt}){
        super({id,name,status,updatedAt,createdAt})
    }

}

export default UserObject