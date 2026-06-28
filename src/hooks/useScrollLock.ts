import { useEffect } from 'react';

export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    const win = window as any;
    
    if (isOpen) {
      // Stop smooth scroll
      if (win.lenis) {
        win.lenis.stop();
      }
      // Stop native scroll/hide scrollbar
      document.body.style.overflow = 'hidden';
    } else {
      // Restore smooth scroll
      if (win.lenis) {
        win.lenis.start();
      }
      // Restore native scroll
      document.body.style.overflow = '';
    }

    return () => {
      // Safety cleanup if unmounted while open
      if (isOpen) {
        if (win.lenis) {
          win.lenis.start();
        }
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);
}
