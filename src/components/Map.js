import React from 'react'
import { withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -6.2385727, lng: 106.8228363 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -6.2385727, lng: 106.8228363 }} />}
  </GoogleMap>))


export default props => {

    return(
        <>
            <MapComponent

                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxIuH0NKYC3ubkiYIVlLARP773-7eK9Sk&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
        </>
    )
}