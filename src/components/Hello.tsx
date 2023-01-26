import { useEffect, useState } from 'react';
import { IWeatherData } from '../interfaces/IWeatherData';
import { httpGet } from '../services/axiosService';
import { formatWeatherData } from '../services/weatherService';

// If you're using actual API keys, you should create a small express server to handle the API calls.
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * A simple example component.
 */
export const Hello = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);
    const [gptOpinion, setGptOpinion] = useState<string | null>(null);

    const success = async (pos: any) => {
        console.log("Success in action! :D");
        const coords = pos.coords;

        await httpGet(`api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.latitude},${coords.longitude}&days=1&aqi=no&alerts=no`)
            .then(async (data) => {
                let formattedData = await formatWeatherData(data);
            })
            .catch((err) => {
                console.log('Error in getting weather data:', err);
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