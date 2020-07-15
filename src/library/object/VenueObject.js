import BaseObject from './BaseObject'

class VenueObject extends BaseObject {

    constructor({id,name,status,updatedAt,createdAt,version}){
        super({id,name,status,updatedAt,createdAt,version})
    }

}

export default VenueObject