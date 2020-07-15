import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import {Form,Input} from 'semantic-ui-react'
import Icon from 'react-web-vector-icons'
import Geocode from 'react-geocode'
import scriptLoader from 'react-async-script-loader'
import {getUrlParams} from '../utility/Helper'
import {FieldInput} from './RenderFields'

const settings ={
    key:"AIzaSyBxIuH0NKYC3ubkiYIVlLARP773-7eK9Sk",
    language:"en",
    libraries:"places",
}

class Map extends Component{

    constructor(props){
        super(props)
    
        this.map = null
        this.cursorMarker = null
        this.controller = null
        this.controlCenterButton = null
        this.searchInput = null
        this.infoWindow = null
        this.infoWindowContent = null
        this.refSearchInput = React.createRef()

    }

    componentDidMount () {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
          this.init()
        }
      }

    UNSAFE_componentWillReceiveProps({isScriptLoaded,isScriptLoadSucceed}){
    
        if(isScriptLoaded && !this.props.isScriptLoaded){
            if (isScriptLoadSucceed) {
                this.init()
            }else console.log("error Loading script")   
        }
    }

    init(){

        var currentLocation = this.props.center
        this.zoom = 15

        const google = window.google

        //init map
        this.map = new google.maps.Map(this.refs.map,{
            center:currentLocation,
            zoom:this.zoom,
            mapTypeControl:false,
            fullscreenControl:false,
            streetViewControl:false,
            styles:[
                {
                    featureType: 'poi.business',
                    stylers: [{visibility: 'off'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{visibility: 'off'}]
                }
            ]
        })

        this.map.addListener("click",e=>{
            //this.map.setCenter(e.latLng)
            this.moveAndSetMarker(e.latLng)
            this.sendPlaceToInput({marker:this.cursorMarker})
        })

        
        //init cursormarker
        this.cursorMarker = new google.maps.Marker({
            position:this.currentLocation,
            map:this.map,
            draggable:true
        })

        this.cursorMarker.addListener("dragend",e=>{
            this.moveAndSetMarker(e.latLng)
            this.sendPlaceToInput({marker:this.cursorMarker})
        })

        this.cursorMarker.setVisible(true)

        this.initController()
        this.initSearchBox()
        this.initInfoWindow()

        this.moveAndSetMarker(this.map.getCenter())


    }

    initController = () => {

        const google = window.google
        const instance = Object.assign({},this)

        this.controller = this.refs.controller
        this.controlCenterButton = this.refs.controlCenterButton
        
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.controller)
        //handle control center click
        google.maps.event.addDomListener(this.controlCenterButton, 'click', function() {
            instance.map.setCenter(instance.props.center)
            instance.moveAndSetMarker(instance.map.getCenter())
            instance.sendPlaceToInput({marker:instance.cursorMarker})
        })
        
    }

    initSearchBox = () => {
        const google = window.google
        const map = this.map
        
        this.searchBox = this.refs.searchBox
        this.searchInput = ReactDOM.findDOMNode(this.refSearchInput.current).querySelector("input")

        //set input autocomplete
        var input = new google.maps.places.Autocomplete(this.searchInput)
        
        input.setTypes([]);
        input.setOptions({strictBounds: false})
        input.bindTo('bounds',map)
        input.setFields(['address_components', 'geometry', 'icon', 'name']);
        
        //add listener as user search places
        input.addListener("place_changed",()=>{
                
            var place = input.getPlace()

            //if no place found on the list
            if (!place.geometry) return;
            
            if (place.geometry.viewport)  map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17); 
            }

            this.moveAndSetMarker(map.getCenter())
            this.sendPlaceToInput({place,marker:this.cursorMarker})
            this.showInfoWindow(place)
                
        })
    }

    initInfoWindow = () => {

        const google = window.google

        this.infoWindow = new google.maps.InfoWindow()
        this.infoWindowContent = this.refs.infoWindowContent
        this.infoWindow.setContent(this.infoWindowContent)


    }

    showInfoWindow = place => {

        this.infoWindow.close()
        
        var address = '';

        if (place.address_components) {
            
            address = [
            ((place.address_components[2] && place.address_components[2].short_name) || ''),
            ((place.address_components[1] && place.address_components[1].short_name) || ''),
            ((place.address_components[5] && place.address_components[5].short_name) || '')
            ].join(' ');
        }

        this.infoWindowContent.children['place-icon'].src = place.icon;
        this.infoWindowContent.children['place-name'].textContent = place.name;
        this.infoWindowContent.children['place-address'].textContent = address;

        this.infoWindow.open(this.map, this.cursorMarker);

    }

    moveAndSetMarker = latLng =>{

        this.infoWindow.close()
        this.cursorMarker.setVisible(false)
        this.cursorMarker.setPosition(latLng)

        //console.log(`lat: ${this.cursorMarker.getPosition().lat()}, lon: ${this.cursorMarker.getPosition().lng()}`)

        this.cursorMarker.setVisible(true)

    }

    sendPlaceToInput = ({marker,place=false}) => {

        if(marker){
            
            //console.log(`lat: ${marker.getPosition().lat()}, lon: ${marker.getPosition().lng()}`)

            Geocode.fromLatLng(marker.getPosition().lat(),marker.getPosition().lng())
                .then(response=>{
                    console.log(response)
                    const result = response.results[0]
                    const address = result.formatted_address
                    
                    if(typeof this.props.onSelected === "function"){

                        this.props.onSelected({
                            name : place ? place.name : false,
                            address,
                            latLng : {
                                lat:marker.getPosition().lat(),
                                lon:marker.getPosition().lng()
                            }
                        })
                    }

                }).catch(error=>console.log(error))
        }

    }

    render(){

        this.refSearchInput = React.createRef()
        return(
            <div style={{width:"100%",height:"100%"}}>
                <div className="searchBox mb-3" ref="searchBox">
                    <Input fluid ref={this.refSearchInput} name="searchInput" autoComplete="new-search"
                        className="searchInput" type="text" onFocus={(e)=>e.target.select()} 
                        placeholder={this.props.placeholder || "Search location"} label={this.props.label}/>
                </div>
                <div className="controller" ref="controller">
                    <div className="controlButton" ref="controlCenterButton">
                        <Icon style={{lineHeight:1}} name="target" font="MaterialCommunityIcons" color="#777777" size={24}/>
                    </div>
                </div>
                <div className="infoWindowContent" ref="infoWindowContent">
                    <img src="" alt="marker" width="16" height="16" id="place-icon"/>&nbsp;
                    <span id="place-name"  className="title"></span><br/>
                    <span id="place-address"></span>
                </div>
                <div style={{width:"100%",height:"100%"}}>
                    <div className="map" ref="map"></div>
                </div>
            </div>
        )
    }

}

Geocode.setApiKey(settings.key)
Geocode.setLanguage(settings.language)

Map = scriptLoader([`https://maps.googleapis.com/maps/api/js?${getUrlParams(settings)}`])(Map)

Map = connect(state=>({state}))(Map)

export const GoogleMap = Map
