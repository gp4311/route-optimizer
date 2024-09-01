import React, { useState, useEffect } from 'react';
import LocationSearch from '../location-search';
import './styles.css'
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";

const DynamicStopsList = ({ onStopsSelected }) => {
  const [stops, setStops] = useState([null]);

  const handleStopSelected = (placeId, index) => {
    const updatedStops = [...stops];
    updatedStops[index] = placeId;
    setStops(updatedStops);
  };

  const addStop = (index) => {
    const updatedStop = [...stops];
    updatedStop.splice(index + 1, 0, null);
    setStops(updatedStop);
  };

  const removeStop = (index) => {
    if (stops.length > 1) {
      const updatedStops = stops.filter((_, i) => i !== index);
      setStops(updatedStops);
    }
  };

  useEffect(() => {
    onStopsSelected(stops);
  }, [stops]);

  return (
    <div className='stops'>
      {stops.map((placeId, index) => (
        <div key={index} className='stop'>
          <div>
            <LocationSearch onPlaceSelected={(placeId) => handleStopSelected(placeId, index)} />
          </div>
          <button onClick={() => addStop(index)}>
            <FiPlus />
          </button>
          <button onClick={() => removeStop(index)}>
            <RiDeleteBin7Line />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DynamicStopsList;
