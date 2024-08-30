import './styles.css';
import React, { useState } from 'react';
import LocationSearch from '../location-search';
import DynamicStopsList from '../dynamic-stops-list';

const Form = () => {
    const [ start, setStart ] = useState(null);
    const [ end, setEnd ] = useState(null);
    const [ stops, setStops ] = useState([]);
    const [ avoid, setAvoid ] = useState([]);
    const [ departureTime, setDepartureTime ] = useState(null);
    const [ mode, setMode ] = useState('driving')

    const handleAvoidChange = (event) => {
        const { value, checked } = event.target;
        setAvoid((prevAvoid) =>
            checked ? [...prevAvoid, value] : prevAvoid.filter((item) => item !== value)
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            start,
            end,
            stops,
            avoid,
            departureTime,
            mode,
        };
        console.log(formData);
        // Send formData to a server or use it as needed.
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Start:</label>
                <LocationSearch onPlaceSelected={setStart} />
            </div>

            <div>
                <label>End:</label>
                <LocationSearch onPlaceSelected={setEnd} />
            </div>

            <div>
                <label>Stops:</label>
                <DynamicStopsList onStopsSelected={setStops}/>
            </div>

            <div>
                <label>Restrictions</label>
                <div className='list'>
                    <label>
                        <input
                            type='checkbox'
                            value='highways'
                            checked={avoid.includes('highways')}
                            onChange={handleAvoidChange}
                        />
                        Highways
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='ferries'
                            checked={avoid.includes('ferries')}
                            onChange={handleAvoidChange}
                        />
                        Ferries
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='tolls'
                            checked={avoid.includes('tolls')}
                            onChange={handleAvoidChange}
                        />
                        Tolls
                    </label>
                </div>
            </div>

            <div>
                <label>Mode of Transportation</label>
                <div className='list'>
                    <label>
                        <input 
                            type='radio'
                            value='driving'
                            checked={mode === 'driving'}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        Driving
                    </label>
                    <label>
                        <input 
                            type='radio'
                            value='bicycling'
                            checked={mode === 'bicycling'}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        Bicycling
                    </label>
                    <label>
                        <input 
                            type='radio'
                            value='walking'
                            checked={mode === 'walking'}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        Walking
                    </label>
                </div>
            </div>

            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form;