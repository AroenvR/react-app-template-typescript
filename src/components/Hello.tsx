import { useEffect, useState } from 'react';
import { httpGet } from '../services/axiosService';
import { isTruthy } from '../util/isTruthy';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * A simple example component.
 */
export const Hello = () => {
    // const [location, setLocation] = useState<ILocation | undefined>(undefined); // TODO: Interface
    const [weather, setWeather] = useState(null); // TODO: Interface

    const success = async (pos: any) => {
        console.log("Success in action! :D");
        const coords = pos.coords;

        await httpGet(`api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.latitude},${coords.longitude}&days=1&aqi=no&alerts=no`)
            .then((data) => {
                if (isTruthy(data)) setWeather(data);
            });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);
    console.log('weather:', weather);
    
    return (
        <div>
            Hello! /wave
        </div>
    );
};