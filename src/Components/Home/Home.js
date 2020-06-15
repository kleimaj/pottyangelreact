import React, { useState, useEffect } from 'react';
import MyMapComponent from '../Map/Map';
import Potty from '../../api/Potty';
import Modal from '../Modal/Modal';
import './Home.css';
// import { defaultLoadScriptProps } from '@react-google-maps/api/dist/LoadScript';

const Home = (props) => {
    const [pos, setPos] = useState(null);
    const [potties, setPotties] = useState(null);
    const [emergency, setEmergency] = useState(false);
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [currPos, setCurrPos] = useState([])
    const [mutex, setMutex] = useState(0)

    const getLocation = async () => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          function success(pos) {
            let crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            setPos({lat: crd.latitude, lng: crd.longitude});
            return({lat: crd.latitude, lng: crd.longitude})
          }
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }          
        navigator.geolocation.getCurrentPosition(success, error, options);

    }
    const getPotties = async(pos) => {
      if (mutex) return;
      setMutex(1)
      const data = await Potty.PottyIndex(pos);
      console.log(data);
      // hardcoded data 
      // let hardcoded_data = 
      // {
      //   potties: [
      //     {
      //     name: 'Starbucks',
      //     latitude: "34.390000",
      //     longitude: "-118.570000"
      //     },
      //     {
      //     name: 'Starbucks',
      //     latitude: "34.400000",
      //     longitude: "-118.550000"
      //     }
      //   ]}
        // setPotties(hardcoded_data.potties);
      setPotties(data.data.potties);
      setCurrPos(pos)
      setMutex(0)
  }
  const modal = (latlng) => {
    setShow(true);
    setData([latlng.lat(), latlng.lng()]);
  }
  const submitModal = (name,rating) => {
    setShow(false);

    //api call
    // const data = await  
    setData((current) => [...current,
      name,
      rating
    ]);
    // const data = await Potty.PottyCreate(data)
  }
    useEffect(() => {
        getLocation()
        // .then((position) => getPotties(position), 
        // (err) => console.log("Cant scan position", err))
    }, []);
    useEffect(() => {
      if (pos)
        getPotties(pos);
  }, [pos]);
    return (
        <>
          { (props.loggedIn && !add) ? (
            <button className="add-button" onClick={() => setAdd(true)}>Add Potty</button>
          ) : 
            (props.loggedIn && add ? (
              <>
              <button className="add-button" onClick={() => setAdd(false)}>Cancel</button>
              <h2 className="ui-message">Click on Map to Add a New Potty</h2>
              </>
            ): null)}
            {show ? (
              <Modal submitModal={submitModal} setShow={setShow}/>
            ) : null}
        <div className="map">
            {/* <h1>Map</h1> */}
         <MyMapComponent 
          pos={pos} 
          potties={potties} 
          emergency={emergency} 
          setEmergency={setEmergency} 
          add={add}
          modal={modal} 
          newMarker={data} 
          setData={setData} 
          getPotties={getPotties} 
          currPos={currPos} />

        </div>
        <button className="emergency" onClick={() => setEmergency(true)}>EMERGENCY</button>
        </>
    )
}

export default Home;