import './styles.css';
import React, { useState, useEffect } from 'react';
 
const Result = ({ stops, time, distance }) => {

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            const fetchedAddresses = [];
            const map = new window.google.maps.Map(document.createElement('div'));

            for (let i = 0; i < stops.length; i++) {
                await new Promise((resolve) => {
                    const service = new window.google.maps.places.PlacesService(map);
                    const request = {
                        placeId: stops[i],
                        fields: ['formatted_address', 'name'],
                    };

                    service.getDetails(request, (place, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                            fetchedAddresses.push(place.formatted_address);
                        } else {
                            console.error('Error fetching place details:', status);
                        }
                        resolve();
                    });
                });
            }

            setAddresses(fetchedAddresses);
        };

        fetchAddresses();
    }, [stops, time, distance]);

    const round = (value, precision) => {
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    return (
        <div>
            <div>
                <div className='result-title'>
                    {addresses.length > 0 ? 'Here\'s your optimized trip!' : null}
                </div>
                <ol className='result-list'>
                    {addresses.map((address, index) => (
                        <li key={index}>{address}</li>
                    ))}
                </ol>
            </div>
            <div>{time && distance ? `This trip will take ${round(time/60, 1)} minutes and you'll travel ${round(distance/1000, 1)} km.` : null}</div>
        </div>
    );
}

export default Result;