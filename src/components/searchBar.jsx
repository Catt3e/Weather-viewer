import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState("");

    function handleSearch() {
        if (inputValue.trim() === '') return;
        onSearch(inputValue);
    }

    return (
        <div className="w-full max-w-sm mx-auto">
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
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <button
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;