function Forecast({ forecastData }) {
    if (!forecastData || !forecastData.list) {
        return (
            <p className="text-gray-400 text-center">
                No forecast data available.
            </p>
        );
    }

    // Group by day
    const groups = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(item);
    });

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                5-Day Forecast
            </h2>

            {/* Grid instead of vertical list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(groups).map(day => {
                    const dayData = groups[day];

                    // Compute min / max temp
                    const temps = dayData.map(item => item.main.temp);
                    const min = Math.min(...temps);
                    const max = Math.max(...temps);

                    // Pick a representative item (midday if possible)
                    const representative =
                        dayData.find(item =>
                            item.dt_txt.includes("12:00:00")
                        ) || dayData[0];

                    return (
                        <div
                            key={day}
                            className="
                                bg-gray-800
                                border border-gray-700
                                rounded-xl
                                p-4
                                hover:bg-gray-700
                                transition
                            "
                        >
                            {/* Day */}
                            <h3 className="font-semibold mb-2">
                                {day}
                            </h3>

                            {/* Icon + description */}
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm text-gray-300 capitalize">
                                    {representative.weather[0].description}
                                </p>
                                <img
                                    className="w-10 h-10"
                                    src={`https://openweathermap.org/img/wn/${representative.weather[0].icon}@2x.png`}
                                    alt={representative.weather[0].description}
                                />
                            </div>

                            {/* Temps */}
                            <div className="text-sm text-gray-400 flex justify-between">
                                <span>Min: {Math.round(min)}°C</span>
                                <span>Max: {Math.round(max)}°C</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;