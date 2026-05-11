function CurrentWeather({ weatherData }) {
    if (!weatherData) {
        return (
            <div className="
                bg-gray-900
                flex items-center justify-center
                text-gray-400
                rounded-2xl
                shadow-lg
                p-6
                border border-gray-800
                w-full
            ">
                No city selected. Please search for a city to view its current weather.
            </div>
        );
    }

    const { name, main, weather, wind } = weatherData;

    return (
        <div className="flex flex-col gap-4 w-full">

            {/* Main card */}
            <div className="
                bg-gray-900
                text-gray-100
                rounded-2xl
                shadow-lg
                p-6
                border border-gray-800
                w-full
            ">
                {/* City */}
                {name && (
                    <h2 className="text-2xl font-semibold mb-2">{name}</h2>
                )}

                {!name && (
                    <h2 className="text-2xl font-semibold mb-2">Unknown Location</h2>
                )}

                {/* Weather + icon */}
                <div className="flex items-center justify-between mb-4">
                    <p className="capitalize text-gray-300">
                        {weather[0].description}
                    </p>
                    <img
                        className="w-12 h-12"
                        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                        alt={weather[0].description}
                    />
                </div>

                {/* Temperature */}
                <div className="mb-4">
                    <p className="text-4xl font-bold">
                        {Math.round(main.temp)}°C
                    </p>
                </div>

                {/* Extra info */}
                <div className="flex justify-between text-sm text-gray-400 border-t border-gray-800 pt-4">
                    <p>Wind: {wind.speed} m/s</p>
                    <p>Feels like: {Math.round(main.feels_like)}°C</p>
                </div>
            </div>

            {/* Alert card */}
            {main.alert && (
                <div className="
                    bg-yellow-500/10
                    border border-yellow-500/30
                    rounded-2xl
                    p-4
                    text-yellow-300
                    w-full
                ">
                    <p className="text-sm font-semibold">
                        {main.alert}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CurrentWeather;