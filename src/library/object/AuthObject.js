import UserObject from './UserObject'

export default class AuthObject {

    constructor({state}){
        this.state = state

        if(state.auth.data.user)
            this.user = new UserObject({
                name:state.auth.data.user.attributes.name
            })
    }

    getUser(){
        return this.user ? this.user : null
    }
}