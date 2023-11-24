import { useState, useEffect } from 'react';

const usePolls = (apiEndpoint) => {
  const perPage = 5;
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newer');
  const [active, setActive] = useState('all');

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
      if (data.polls.length < perPage) setHasMore(false);
      setFeeds(prevItems => [...new Set([...prevItems, ...data.polls])]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      getPolls();
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const resetPolls = () => {
    setFeeds([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    setTimeout(() => {
      getPolls();
    }, 30);
  };

  return { feeds, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls };
};

export default usePolls;
