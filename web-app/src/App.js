import Form from './components/form';
import Map from './components/map';
import Result from './components/result';
import { LoadScript } from '@react-google-maps/api';
import './app.css'

const libraries = ['places'];

function App() {
  return (
    <div className='app'>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
        <Form />
        <Map />
        <Result />
      </LoadScript>
    </div>
  );
}

export default App;
