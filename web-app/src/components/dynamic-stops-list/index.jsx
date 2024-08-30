import React, { useState, useEffect } from 'react';
import LocationSearch from '../location-search';

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
    <div>
      {stops.map((placeId, index) => (
        <div key={index}>
          <LocationSearch onPlaceSelected={(placeId) => handleStopSelected(placeId, index)} />
          <button onClick={() => addStop(index)}>
            Add
          </button>
          <button onClick={() => removeStop(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default DynamicStopsList;
