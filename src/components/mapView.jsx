import { importLibrary } from "@googlemaps/js-api-loader";
import { initMap } from "../services/mapAPI";
import { useEffect, useRef, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import marker from "../assets/marker3.png";

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
        if (!mapRef.current || mapInstanceRef.current) {
            return;
        }
        const init = async () => {
            try{
                mapInstanceRef.current = await initMap(mapRef.current);
            }
            catch (error) {
                toast.error("Failed to initialize map.");
                console.error("Error initializing map:", error);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current 
            || !currentCity?.coord
            || !window.google
        ) return;
        const { lat, lon } = currentCity.coord;
        mapInstanceRef.current.setCenter({ lat, lng: lon });
    }, [currentCity]);

    useEffect(() => {
        if (!mapInstanceRef.current || !window.google) return;

        let listener;

        const initMarker = async () => {
            
            
            listener = mapInstanceRef.current.addListener("click",(e) => {
                    const lat = e.latLng.lat();
                    const lon = e.latLng.lng();
                    onLocationSelect(lat, lon);
                }
            );
        };
        initMarker();
        return () => {
            if (listener) listener.remove();
        };
    }, [onLocationSelect]);

    useEffect(() => {
        if (!mapInstanceRef.current 
            || !window.google
            || !currentCity?.coord
        ) return;

        const map = mapInstanceRef.current;
        let cancelled = false;

        const updateMarker = async () => {
            const { AdvancedMarkerElement } = await importLibrary("marker").catch(error => {
                toast.error("Failed to initialize marker.");
                console.error("Error initializing marker:", error);
                return {};
            });
            if (!AdvancedMarkerElement) return;

            if (cancelled) return;

            const { lat, lon } = currentCity.coord;
            const position = { lat, lng: lon };
            if (markerRef.current)
                markerRef.current.position = position;
            else {
                const markerIcon = document.createElement("img");
                markerIcon.src = marker;
                markerIcon.alt = "Marker";
                markerIcon.style.filter = "brightness(0.8) drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))";
                markerIcon.className = "w-8 h-8";

                const markerContent = document.createElement("div");
                markerContent.appendChild(markerIcon);

                markerRef.current =
                    new AdvancedMarkerElement({
                        position,
                        map: mapInstanceRef.current,
                        content: markerContent,
                    });
            }
            mapInstanceRef.current.panTo(position);
        };

        updateMarker();
        return () => {
                cancelled = true;
            };
    }, [isExpanded, currentCity]);

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