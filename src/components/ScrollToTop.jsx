import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Force native scroll reset immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // 2. Also try to find and reset Lenis if it exists globally
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }

    // 3. Backup for standard browser behavior
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
