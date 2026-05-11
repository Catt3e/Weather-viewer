import { useState, useRef } from 'react';
import { getCitySuggestions } from '../services/weatherAPI';
import { toast } from 'react-hot-toast';

function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceTimer = useRef(null);

    function handleSearch() {
        if (inputValue.trim() === '') return;
        onSearch(inputValue);
    }

    function fetchSuggestions(query) {
        if (query.trim() !== '') {
            if (query.includes(' '))
                query = query.replace(' ', '%20');
            getCitySuggestions(query)
                .then(data => {
                    setSuggestions(data);
                })
                .catch(error => {
                    console.error('Error fetching city suggestions:', error);
                    toast.error("Failed to fetch city suggestions.");
                    setSuggestions([]);
                });
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setInputValue(value);

        if (debounceTimer.current)
            clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="flex gap-2">
                <input
                    type="text"
                    className="
                        w-full
                        bg-gray-900
                        text-gray-100
                        placeholder-gray-500
                        border border-gray-800
                        rounded-xl
                        px-4 py-2
                        outline-none
                        focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500
                        transition
                    "
                    placeholder="Search city..."
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button
                    className="mt-2 w-40 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <ul className="mt-2 bg-gray-900 border border-gray-800 rounded-xl max-h-48 overflow-y-auto">
                {showSuggestions && suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        className="bg-gray-800 text-gray-300 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                            setInputValue(suggestion.name);
                            onSearch(suggestion.name);
                            setShowSuggestions(false);
                        }}
                    >
                        {suggestion.name}, {suggestion.country}
                    </li>
                ))}
            </ul>
        </div>
        
    );
}

export default SearchBar;