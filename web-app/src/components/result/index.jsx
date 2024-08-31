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

    return (
        <div>
            <div>
                {addresses.map((address, index) => (
                    <div key={index}>
                        <p>{address}</p>
                    </div>
                ))}
            </div>
            <div>Time: {time}</div>
            <div>Distance: {distance}</div>
        </div>
    );
}

export default Result;