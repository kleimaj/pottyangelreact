//Get current address
// AIzaSyB_tSp7ilLdqHHWttFNJRXYyqrUg-Ad-TU
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.API_KEY_2);

export async function getCurrentAddress(location) {
    const res = await Geocode.fromLatLng(location.latitude, location.longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          return address;
        },
        error => {
          console.error(error);
        }
      );
    return res;
}

// export default getCurrentAddress