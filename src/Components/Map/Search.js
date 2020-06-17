import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import {
  Combobox, 
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import "@reach/combobox/styles.css";

const Search = (props) => {
    const {
      ready,
      value,
      suggestions: {status, data}, 
      setValue, 
      clearSuggestions
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {lat: () => props.currPos.lat, lng: () => props.currPos.lng},
        radius: 200 * 1000
      },
    });
    
    return (
      <div className="search">
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
  
        try {
          const res = await getGeocode({address});
          const {lat, lng} = await getLatLng(res[0]);
          props.panTo({lat, lng});
        }
        catch (error) {
          console.log(error);
        }
      }}>
        <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value);
        }} disabled={!ready} placeholder={"Enter an address"} />
          <ComboboxPopover>
            <ComboboxList className="suggestion-list">
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
      </Combobox>
      </div>
    )
  }
export default Search;