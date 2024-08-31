import Form from './components/form';
import Result from './components/result';
import { LoadScript } from '@react-google-maps/api';
import './app.css';
import { useState } from 'react';

const libraries = ['places'];

function App() {
  const [ stops, setStops ] = useState([]);
  const [ time, setTime ] = useState(null);
  const [ distance, setDistance ] = useState(null);

  const handleResultReceived = (result) => {
    if (result) {
      setStops(result.stops);
      setTime(result.time);
      setDistance(result.distance);
    }
  }

  return (
    <div className='app'>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
        <Form onResultReceived={handleResultReceived}/>
        <Result stops={stops} time={time} distance={distance}/>
      </LoadScript>
    </div>
  );
}

export default App;
