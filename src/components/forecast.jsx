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

    // ---- TODAY (3-hour forecast) ----
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayForecasts = forecastData.list.filter(item => {
        const itemTime = new Date(item.dt * 1000);
        return itemTime >= now && itemTime <= endOfDay;
    });

    // Force 8 slots (fill missing with null)
    const fullDaySlots = Array.from({ length: 8 }, (_, i) => {
        return todayForecasts[i] || null;
    });

    return (
        <div>
            {/* ---- TODAY ROW ---- */}
            <h2 className="text-xl font-semibold mb-3">
                Today (3-hour forecast)
            </h2>

            <div className="overflow-x-auto scrollbar-hide mb-6">
                <div className="flex gap-2 min-w-max">
                    {fullDaySlots.map((item, index) => {
                        if (!item) {
                            // Placeholder
                            return (
                                <div
                                    key={index}
                                    className="
                                        w-20 h-28
                                        bg-gray-800/50
                                        border border-gray-700
                                        rounded-lg
                                        flex items-center justify-center
                                        text-xs text-gray-500
                                    "
                                >
                                    —
                                </div>
                            );
                        }

                        const time = new Date(item.dt * 1000)
                            .getHours()
                            .toString()
                            .padStart(2, '0') + ":00";

                        return (
                            <div
                                key={index}
                                className="
                                    w-20 h-28
                                    bg-gray-800
                                    border border-gray-700
                                    rounded-lg
                                    p-2
                                    flex flex-col items-center justify-between
                                "
                            >
                                <span className="text-xs text-gray-400">
                                    {time}
                                </span>

                                <img
                                    className="w-8 h-8"
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt=""
                                />

                                <span className="text-sm font-semibold">
                                    {Math.round(item.main.temp)}°
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ---- 5 DAY FORECAST ---- */}
            <h2 className="text-xl font-semibold mb-4">
                5-Day Forecast
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(groups).map(day => {
                    const dayData = groups[day];

                    const temps = dayData.map(item => item.main.temp);
                    const min = Math.min(...temps);
                    const max = Math.max(...temps);

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
                            <h3 className="font-semibold mb-2">
                                {day}
                            </h3>

                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm text-gray-300 capitalize">
                                    {representative.weather[0].description}
                                </p>
                                <img
                                    className="w-10 h-10"
                                    src={`https://openweathermap.org/img/wn/${representative.weather[0].icon}@2x.png`}
                                    alt=""
                                />
                            </div>

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