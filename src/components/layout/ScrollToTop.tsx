import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if lenis is available globally
    const win = window as any;
    if (win.lenis) {
      win.lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for when prefers-reduced-motion is active and lenis is disabled
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
