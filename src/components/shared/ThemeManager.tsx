import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

interface ThemeManagerProps {
  children: React.ReactNode;
}

const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Determine if the current route is public
    const isPublicRoute = 
      location.pathname === '/' ||
      location.pathname.startsWith('/catalog') ||
      location.pathname === '/login' ||
      location.pathname === '/register';

    if (isPublicRoute) {
      root.setAttribute('data-theme', 'light');
      root.classList.remove('dark');
    } else {
      root.setAttribute('data-theme', theme);
      // Fallback Tailwind `.dark` class if someone still uses it
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, location.pathname]);

  return <>{children}</>;
};

export default ThemeManager;
