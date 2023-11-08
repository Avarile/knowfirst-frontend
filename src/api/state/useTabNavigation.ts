import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useTabNavigation = () => { 
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (currentPath === '/') {
      setCurrentTab(0);
    } else if (currentPath === '/about') {
      setCurrentTab(1);
    } else if (currentPath === '/contact') {
      setCurrentTab(2);
    }
  }, [currentPath]);

  return [ currentTab, setCurrentTab, currentPath ];
}
