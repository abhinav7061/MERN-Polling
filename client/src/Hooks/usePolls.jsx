// Importing necessary hooks from React
import { useState, useEffect } from 'react';

// Custom hook for managing poll-related data
const usePolls = (apiEndpoint) => {
  // Constants and state variables for managing poll data
  const perPage = 5;
  const [feeds, setFeeds] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newer');
  const [active, setActive] = useState('all');
  const [searchPlaceholder, setSearchPlaceholder] = useState(null);

  // Function to fetch polls from the server
  const getPolls = async () => {
    try {
      const res = await fetch(`${apiEndpoint}?page=${encodeURIComponent(page)}&search=${encodeURIComponent(search)}&sort=${sort}&active=${active}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();

      // Check if there are more polls to load
      if (data.success) {
        if (data.polls.length < perPage) setHasMore(false);
        setFeeds(prevItems => [...new Set([...prevItems, ...data.polls])]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch more polls when the page or search criteria changes
  useEffect(() => {
    if (hasMore) {
      getPolls();
    }
  }, [page, hasMore]);

  // Function to handle infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  // Set up the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to reset poll-related state variables and fetch new polls
  const resetPolls = () => {
    setSearchPlaceholder(search);
    setSearch('');
    setFeeds([]);
    setHasMore(true);
    setLoading(true);

    // If already on the first page, fetch new polls; otherwise, reset the page to 1
    if (page === 1) {
      getPolls();
    } else {
      setPage(1);
    }
  };

  // Return the state variables and functions for external usage
  return { feeds, setFeeds, errorMessage, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls, searchPlaceholder };
};

// Export the custom hook for use in other components
export default usePolls;
