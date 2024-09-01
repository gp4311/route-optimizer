import './styles.css';
import React, { useState, useEffect } from 'react';
import LocationSearch from '../location-search';
import DynamicStopsList from '../dynamic-stops-list';
import axios from 'axios';

const Form = ({ onResultReceived }) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [stops, setStops] = useState([]);
    const [avoid, setAvoid] = useState([]);
    const [departureTime, setDepartureTime] = useState(null);
    const [mode, setMode] = useState('driving');

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAvoidChange = (event) => {
        const { value, checked } = event.target;
        setAvoid((prevAvoid) =>
            checked ? [...prevAvoid, value] : prevAvoid.filter((item) => item !== value)
        );
    };

    useEffect(() => {
        onResultReceived(result)
    }, [result])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            start,
            end,
            stops,
            avoid,
            departureTime,
            mode,
        };

        try {
            const response = await axios.post(process.env.REACT_APP_WEB_API_URL, formData);
            setResult(response.data);
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred');
            setResult(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form-section'>
            <div>
                <div className='input-labels'>Start</div>
                <LocationSearch onPlaceSelected={setStart} />
            </div>

            <div>
                <div className='input-labels'>End</div>
                <LocationSearch onPlaceSelected={setEnd} />
            </div>

            <div>
                <div className='input-labels'>Stops</div>
                <DynamicStopsList onStopsSelected={setStops} />
            </div>

            <div>
                <div className='input-labels'>Departure Time:</div>
                <input
                    type='datetime-local'
                    onChange={(e) => setDepartureTime(e.target.value)}
                />
            </div>

            <div className='form-lists'>
                <div>
                    <div className='input-labels'>Restrictions</div>
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
                    <div className='input-labels'>Mode of Transportation</div>
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
            </div>

            <div className='submit-button'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Form;