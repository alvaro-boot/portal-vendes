import { useState, useEffect } from 'react';
import { lightTheme, darkTheme, ThemeMode } from '@/design-system/theme';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [theme, setTheme] = useState(lightTheme);

  // Detectar preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'dark' : 'light';
      setMode(newMode);
      setTheme(newMode === 'dark' ? darkTheme : lightTheme);
    };

    // Establecer modo inicial
    const initialMode = mediaQuery.matches ? 'dark' : 'light';
    setMode(initialMode);
    setTheme(initialMode === 'dark' ? darkTheme : lightTheme);

    // Escuchar cambios
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Cambiar tema manualmente
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setTheme(newMode === 'dark' ? darkTheme : lightTheme);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('vendes-theme', newMode);
  };

  // Cargar preferencia guardada
  useEffect(() => {
    const savedTheme = localStorage.getItem('vendes-theme') as ThemeMode;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setMode(savedTheme);
      setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
    }
  }, []);

  return {
    theme,
    mode,
    toggleTheme,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };
};
