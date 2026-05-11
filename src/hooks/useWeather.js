import { useState, useEffect } from 'react';
import { getCurrentWeatherAPI, getForecast } from '../services/weatherAPI';
import { Toast } from 'bootstrap';

function useWeather(city) {

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        setError(null);

        const fetchWeatherData = async () => {
            try {
                const [weather, forecast] = await Promise.all([
                    getCurrentWeatherAPI(city),
                    getForecast(city)
                ]);

                setWeatherData(weather);
                setForecastData(forecast);
            } catch (err) {
                setError(err.message);
                Toast.getOrCreateInstance(document.getElementById('error-toast')).show();
            }
            finally{
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    return { weatherData, forecastData, loading, error };
}
export default useWeather;