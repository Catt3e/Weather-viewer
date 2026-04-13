const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

async function getCurrentWeatherAPI(city) {
    const url = `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText} - ${city} not found`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching current weather data:", error);
        throw error;
    }
}

async function getForecast(city) {
    const url = `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Error ${response.status}: ${response.statusText} - ${city} not found`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        throw error;
    }
}

async function getCitySuggestions(query) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching city suggestions:", error);
        throw error;
    }
}

export { getCurrentWeatherAPI, getForecast, getCitySuggestions };