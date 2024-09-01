import React, { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import './styles.css'

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
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
                type="text"
                placeholder=""
                ref={inputRef}
            />
        </Autocomplete>
    )
}

export default LocationSearch;