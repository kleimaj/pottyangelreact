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
      const [closest,setClosest] = useState(null);
      const [minDist, setDist] = useState(null);
      const [centerCoords, setCenter] = useState()
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
      function distance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      }
      const calculateDistance = (potty) => {
        if (!props.pos) return;
        if (!closest) {
          setClosest(potty);
          setDist(distance(props.pos.lat, props.pos.lng, potty.latitude, potty.longitude));
        }
        else {
          let dist = distance(props.pos.lat, props.pos.lng, potty.latitude, potty.longitude);
          if (dist < minDist) {
            setDist(dist);
            setClosest(potty);
          }
        }
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
    useEffect(() => {
      if (props.emergency) {
        console.log("EMERGENCY")
        setActive(closest);
        setCenter({lat: parseFloat(closest.latitude), lng: parseFloat(closest.longitude)});
      }
    }, [props.emergency]);
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
        center={centerCoords || center} 
        options={options}
        onLoad={onMapLoad}>
        {markers.map((marker,idx) => 
        {
          calculateDistance(marker);
        return <Marker 
          key={idx} 
          position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}} 
        // icon={{
        //   url: '/toilet.svg'
        // }}
          onClick={() => {
            setActive(marker);
            setCenter({lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)});
          }}
        />})}
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