import React, { useState, useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const MyMapComponent = (props) => {

    let [markers, setMarkers] = useState(null);
    useEffect(() => {
        if (props.potties) {
            let potties = props.potties.map((potty, idx) => {
                return <Marker key={idx} position={{'lat': potty.latitude, 'lng':potty.longitude}} />
            })
            // console.log(potties, '~~~~~~~')
            setMarkers(potties); 
        }
    }, [props.potties]);
    return (
        <Map google={props.google}
        // bootstrapURLKeys={{ key: "AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg" }}
        // style={{width:'40%', height:'50%', marginTop:'-20px', marginLeft:'-12px'}}
        center={props.pos || {lat: 37.78, lng: -122.44}}
        zoom={15}
        >
        {markers}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg")
  })(MyMapComponent)