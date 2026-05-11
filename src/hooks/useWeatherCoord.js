import { useState, useEffect } from "react";
import { getCurrentWeatherByCoords, getForecastByCoords } from '../services/weatherAPI';

function useWeatherCoord(x, y) {
    const [weatherData, setWeatherDataCoord] = useState(null);
    const [forecastData, setForecastDataCoord] = useState(null);
    const [loading, setLoadingCoord] = useState(true);
    const [error, setErrorCoord] = useState(null);

    useEffect(() => {
        if (x === null || y === null) return;

        setLoadingCoord(true);
        setErrorCoord(null);

        const fetchWeatherData = async () => {
            try {
                const [weather, forecast] = await Promise.all([
                    getCurrentWeatherByCoords(x, y),
                    getForecastByCoords(x, y)
                ]);

                setWeatherDataCoord(weather);
                setForecastDataCoord(forecast);
            } catch (err) {
                setErrorCoord(err.message);
            }
            finally {
                setLoadingCoord(false);
            }
        };

        fetchWeatherData();
    }, [x, y]);

    return { weatherData, forecastData, loading, error };
}
export default useWeatherCoord;