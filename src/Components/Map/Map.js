import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import Rating from './Rating/Rating';

const MyMapComponent = (props) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCkVETyJKT6I-sjzL12zkT57ji7TZT2tQA"
      })
      const [markers, setMarkers] = useState([]);
      const [active, setActive] = useState(null);
      const mapRef = useRef();
      const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);
      const mapContainerStyle = {
        width: '100vw',
        height: '80vh'
      }
      const center = props.pos || {
        lat: 43,
        lng: -79
      }
      const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        // mapTypeControl: true,
        draggable: true,
        zoomControl: true
      }
      useEffect(() => {
        if (props.potties) {
            // let potties = props.potties.map((potty, idx) => {
            //     return (<Marker 
            //     key={idx} 
            //     position={{'lat': potty.latitude, 'lng':potty.longitude}}
            //     onClick={() => {
            //         console.log(potty)
            //         // setActive(potty)
            //         loadInfoWindow(potty);
            //     }}
            //       />)
            // })
            setMarkers(props.potties); 
        }   
        
    }, [props.potties]);
      if (loadError) return "Error loading maps";
      if (!isLoaded) return "Loading Maps";

    // const loadInfoWindow = (active) => {
    //     console.log(active);
    //     let iw = <InfoWindow 
    //     visible={true}
    //     onCloseClick={() => setActive(null)}
    //     position={{lat: parseFloat(active.latitude), lng: parseFloat(active.longitude)}}
    //     >
    //         <div className="infoWindow">
    //         <h2>{active.name}</h2>
    //         <a target="_blank" href={"https://www.google.com/maps/search/?api=1&query="+active.latitude+','+active.longitude}>View Directions</a>
    //         <Rating rating={active.rating} />
    //         </div>
    //     </InfoWindow>
    //     console.log("Setting infowindow")
    //     setActive(iw);
    // }
    // const loadPotties = () => {
    //     if (props.potties) {
    //         console.log(props.potties)
    //         let potties = props.potties.map((potty, idx) => {
    //             return (<Marker 
    //             key={idx} 
    //             position={{'lat': potty.latitude, 'lng':potty.longitude}}
    //             onClick={() => {
    //                 console.log(potty)
    //                 setActive(potty)}}
    //               />)
    //         })
    //         setMarkers(potties); 
    //     }
    //     else {
    //         console.log('initial render')
    //     }
    // }
    return (
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={11} 
        center={center} 
        options={options}
        onLoad={onMapLoad}>
        {markers.map((marker,idx) => 
        <Marker 
          key={idx} 
          position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}} 
        // icon={{
        //   url: '/toilet.svg'
        // }}
          onClick={() => {
            setActive(marker)
          }}
        />)}
        {active ? 
        (<InfoWindow
            position={{lat: parseFloat(active.latitude), lng: parseFloat(active.longitude)}}
            onCloseClick={() => setActive(null)}>
            <div className="infoWindow">
                <h2>{active.name}</h2>
                <a target="_blank" href={"https://www.google.com/maps/search/?api=1&query="+active.latitude+','+active.longitude}>View Directions</a>
                <Rating rating={active.rating} />
             </div>
        </InfoWindow>) : null}
      </GoogleMap>
    );
}

export default MyMapComponent;

// export default MyMapComponent;