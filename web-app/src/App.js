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
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
      <div className='app'>
        <section className='form'>
          <Form onResultReceived={handleResultReceived}/>
        </section>
        <section className='result'>
          <Result stops={stops} time={time} distance={distance}/>
        </section>
      </div>
    </LoadScript>
  );
}

export default App;
