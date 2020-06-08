import React, { useState, useEffect } from 'react';
import MyMapComponent from '../Map/Map';
import Potty from '../../api/Potty';
import './Home.css';

const Home = () => {
    const [pos, setPos] = useState(null);
    const [potties, setPotties] = useState(null);
    const [emergency, setEmergency] = useState(false);

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
          }
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }          
        navigator.geolocation.getCurrentPosition(success, error, options);

    }
    const getPotties = async() => {
      const data = await Potty.PottyIndex();
      console.log(data);
      // hardcoded data 
      let hardcoded_data = 
      {
        potties: [
          {
          name: 'Starbucks',
          latitude: "34.390000",
          longitude: "-118.570000"
          },
          {
          name: 'Starbucks',
          latitude: "34.400000",
          longitude: "-118.550000"
          }
        ]}
        setPotties(hardcoded_data.potties);
      // setPotties(data.data.potties);
  }
    useEffect(() => {
        getLocation();
    }, []);
    useEffect(() => {
      getPotties();
  }, []);
    return (
        <>
        <div className="map">
            {/* <h1>Map</h1> */}
         <MyMapComponent pos={pos} potties={potties} emergency={emergency}/>

        </div>
        <button className="emergency" onClick={() => setEmergency(true)}>EMERGENCY</button>
        </>
    )
}

export default Home;