import { useEffect, useState } from 'react';

// Hook to check if the screen matches a media query
function useMediaQuery(query) {
    const mediaQuery = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaQuery.matches);



    useEffect(() => {
        // Set initial match value
        if (mediaQuery.matches !== matches) {
            setMatches(mediaQuery.matches);
        }

        const handleChange = () => {
            setMatches(mediaQuery.matches);
        };

        // Add listener for changes in media query
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup function
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]); // Re-run effect when query changes

    return matches;
}

export default useMediaQuery;
