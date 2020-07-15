
import {listAccountsInit,listAccounts} from '../redux/account/list/action'
import {createAccountInit,createAccountCancel} from '../redux/account/add/action'
import {getAccount,getAccountCancel} from '../redux/account/get/action'
import {updateAccountInit,updateAccountCancel} from '../redux/account/update/action'

export default class AccountController{
    
    constructor(props){
        const {dispatch,state} = props

        this.state = state
        this.dispatch = dispatch
        this.props = props
    }

    isInitiated = () => {
        return this.state.account.initiated
    }

    listItemsInit = () =>{
        this.dispatch(listAccountsInit())
    }

    listItems = ({orderBy,direction,from,size}) => {

        const requestFrom = typeof from !== "undefined" ? from : 0
        const requestSize = typeof size !== "undefined" ? size : 50
    
        this.dispatch(listAccounts({orderBy,direction,from:requestFrom,size:requestSize}))
        
    }

    showFormAdd = () => {
        this.dispatch(createAccountInit())
    }

    closeFormAdd = () => {
        this.dispatch(createAccountCancel())
    }

    showDetail = item =>{

        this.dispatch(getAccount({item}))
    }

    closeDetail = () =>{
        this.dispatch(getAccountCancel())
    }

    showFormUpdate = () => {
        this.dispatch(updateAccountInit())
    }

    closeFormUpdate = () =>{
        this.dispatch(updateAccountCancel())
    }
}