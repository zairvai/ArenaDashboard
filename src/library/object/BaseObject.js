export default class BaseObject {

    constructor({id,name,status,updatedAt,createdAt,version}){
        this.id = id
        this.name = name ? name : null
        this.status = status === 1 ? true:false
        this.updatedAt = updatedAt
        this.createdAt = createdAt
        this.version = version
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    getStatus(){
       return this.status
    }

    getUpdatedAt(){
        return this.updatedAt
    }

    getCreatedAt(){
        return this.createdAt
    }

    getVersion(){
        return this.version
    }
}