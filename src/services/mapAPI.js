import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

async function initMap(mapElement) {

    setOptions({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        version: process.env.REACT_APP_GOOGLE_MAPS_API_VERSION || "weekly",
        language: process.env.REACT_APP_GOOGLE_MAPS_API_LANGUAGE || "en",
        libraries: ["marker"]
    });

    const { Map } = await importLibrary("maps");
    const { AdvancedMarkerElement } = await importLibrary("marker");

    const map = new Map(mapElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    return map;
}

export { initMap };