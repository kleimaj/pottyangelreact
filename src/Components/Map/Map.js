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
      const [zoom, setZoom] = useState(11);
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
            // console.log(dist) 
            setDist(dist);
            setClosest(potty);
          }
        }
      }
      const mapClick = (e) => {
        if (props.add) {
          console.log("click")
          let latLng = e.latLng;
          // get other data
          props.modal(latLng);
          // need to get data somehow
          let ret = null;
          if (!ret) return;
          setMarkers((current) => [
            ...current,
          {
            latitude: latLng.lat(),
            longitude: latLng.lng(),
            name: ret.name,
            rating: ret.rating,
          }])
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
        console.log(closest);
        setActive(closest);
        setCenter({lat: parseFloat(closest.latitude), lng: parseFloat(closest.longitude)});
      }
    }, [props.emergency]);

    useEffect(() => {
      if (props.add) {
        console.log("ADD");
      }
    }, [props.add]);
    useEffect(() => {
      if (props.newMarker.length == 4) {
        console.log(props.newMarker);
        setMarkers((current) => [
          ...current,
          {
            latitude: props.newMarker[0],
            longitude: props.newMarker[1],
            name: props.newMarker[2],
            rating: props.newMarker[3]
          }
        ])
        props.setData([]);
      }
    }, [props.newMarker])

      if (loadError) return "Error loading maps";
      if (!isLoaded) return "Loading Maps";

    return (
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        onClick={mapClick}
        zoom={zoom || 11} 
        center={centerCoords || center} 
        options={options}
        onLoad={onMapLoad}>
        {props.pos ? 
        <Marker
          onClick={() => {
            setZoom(15)
            setCenter(props.pos)
          }}
          position={props.pos}
          icon={{
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          }} /> : null}
        {markers.map((marker,idx) => 
        {
          calculateDistance(marker);
          // if (idx > 2000) return;
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