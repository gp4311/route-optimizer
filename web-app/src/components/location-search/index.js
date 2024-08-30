import React, { useState, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import './styles.css'

const libraries = ['places'];

const LocationSearch = ({ onPlaceSelected }) => {

    const [ autocomplete, setAutocomplete ] = useState(null);
    const inputRef = useRef(null);

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    }

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            const placeId = place.place_id;
            onPlaceSelected(placeId);
        }
    }

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                    type="text"
                    placeholder="Enter a location"
                    ref={inputRef}
                />
            </Autocomplete>
        </LoadScript>
    )
}

export default LocationSearch;