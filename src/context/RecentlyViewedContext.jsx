import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();
const MAX_RECENT = 6;

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addViewed = (item) => {
    setRecentlyViewed((prev) => {
      const withoutThisItem = prev.filter((viewed) => viewed.id !== item.id);
      return [item, ...withoutThisItem].slice(0, MAX_RECENT);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}