import { importLibrary } from "@googlemaps/js-api-loader";
import { initMap } from "../services/mapAPI";
import { useEffect, useRef, useCallback, useState } from "react";

function MapView({onLocationSelect, currentCity}) {

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const containerRef = useRef(null);
    const markerRef = useRef(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const init = async () => {
            mapInstanceRef.current = await initMap(mapRef.current);
        };

        init();
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current || !currentCity?.coord) return;

        const { lat, lon } = currentCity.coord;
        mapInstanceRef.current.setCenter({ lat, lng: lon });

    }, [currentCity]);

    useEffect(() => {
        if (!mapInstanceRef.current || !window.google) return;

        let marker = markerRef.current;

        const initMarker = async () => {
            const { AdvancedMarkerElement } = await importLibrary("marker");
            
            const listener = mapInstanceRef.current.addListener("click", (e) => {
                const lat = e.latLng.lat();
                const lon = e.latLng.lng();

                const position = { lat, lng: lon };
                if (marker.current){
                    marker.current.setPosition(position);
                } else { 
                    markerRef.current = new AdvancedMarkerElement({
                        position,
                        map: mapInstanceRef.current,
                    });
                }
                onLocationSelect(lat, lon);
            });
            return () => listener.remove();
        };
        initMarker();
    }, [onLocationSelect]);

    useEffect(() => {
        if (!mapInstanceRef.current || !window.google) return;

        const map = mapInstanceRef.current;

        window.google.maps.event.trigger(map, "resize");

        if (currentCity?.coord) {
            const { lat, lon } = currentCity.coord;
            map.setCenter({ lat, lng: lon });
        }
    }, [isExpanded]);

    const mapHeight = isExpanded ? "h-[300px] lg:h-[400px]" : "h-[50px] lg:h-[100px]";

    return (
        <div ref={containerRef} className="w-full">
            <div 
                className={`w-full ${mapHeight} bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden`}
            >
                <div 
                ref={mapRef} 
                className="w-full h-full rounded-xl"
                />
            </div>
            {/* Toggle Button */}
            <button 
                onClick={toggleExpand}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                        text-white rounded-2xl font-medium transition-all duration-200 
                        flex items-center gap-2 mx-auto shadow-lg"
            >
                {isExpanded ? "Collapse Map" : "Expand Map"}
                <span className="text-lg">
                {isExpanded ? "↑" : "↓"}
                </span>
            </button>
        </div>
    )
}

export default MapView;