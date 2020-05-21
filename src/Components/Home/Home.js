import React, { useState, useEffect } from 'react';
import MyMapComponent from '../Map/Map';
import Potty from '../../api/Potty';
import './Home.css';

const Home = () => {
    const [pos, setPos] = useState(null);
    const [potties, setPotties] = useState(null);

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
      setPotties(data.data.potties);
      // setUsers(data.data.customers);
      // loadUsers(data.data.customers);
  }
    useEffect(() => {
        getLocation();
    }, [pos]);
    useEffect(() => {
      getPotties();
  }, []);
    return (
        <>
        <div className="map">
            {/* <h1>Map</h1> */}
         <MyMapComponent pos={pos} potties={potties}/>

        </div>
        <button className="emergency">EMERGENCY</button>
        </>
    )
}

export default Home;