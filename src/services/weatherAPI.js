import toast from "react-hot-toast";

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
        toast.error(`Failed to fetch weather data for ${city}. Please check the city name and try again.`);
        console.error("Error fetching current weather data:", error);
        return;
    }
}

async function getCurrentWeatherByCoords(lat, lon) {
    const url = `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText} - Location not found`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching current weather data by coordinates:", error);
        return;
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
        return;
    }
}

async function getForecastByCoords(lat, lon) {
    const url = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Error ${response.status}: ${response.statusText} - Location not found`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forecast data by coordinates:", error);
        return;
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
        return;
    }
}

async function getCityNameByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Error ${response.status}: ${response.statusText}`
            );
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            return "Unknown Location";
        }
        return data[0].name ?? "Unknown Location";
    } catch (error) {
        console.error("Error fetching city name by coordinates:", error);
        return "Unknown Location";
    }
}

export { getCurrentWeatherAPI, getCurrentWeatherByCoords, getForecast, getForecastByCoords, getCitySuggestions, getCityNameByCoords };