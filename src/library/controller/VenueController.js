
import {listVenuesInit,listVenues} from '../redux/venue/list/action'
import {createVenueInit,createVenueCancel} from '../redux/venue/add/action'
// import {getVenue,getVenueCancel} from '../redux/venue/get/action'
// import {updateVenueInit,updateVenueCancel} from '../redux/venue/update/action'

export default class VenueController{
    
    constructor(props){
        const {dispatch,state} = props

        this.state = state
        this.dispatch = dispatch
        this.props = props
    }

    isInitiated = () => {
        return this.state.venue.initiated
    }

    listItemsInit = () =>{
        this.dispatch(listVenuesInit())
    }

    listItems = ({orderBy,direction,from,size}) => {

        const requestFrom = typeof from !== "undefined" ? from : 0
        const requestSize = typeof size !== "undefined" ? size : 50
    
        this.dispatch(listVenues({orderBy,direction,from:requestFrom,size:requestSize}))
        
    }

    showFormAdd = () => {
        this.dispatch(createVenueInit())
    }

    closeFormAdd = () => {
        this.dispatch(createVenueCancel())
    }

    // showDetail = item =>{

    //     this.dispatch(getVenue({item}))
    // }

    // closeDetail = () =>{
    //     this.dispatch(getVenueCancel())
    // }

    // showFormUpdate = () => {
    //     this.dispatch(updateVenueInit())
    // }

    // closeFormUpdate = () =>{
    //     this.dispatch(updateVenueCancel())
    // }
}