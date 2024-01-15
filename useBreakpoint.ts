import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const handleResize = () => {
      // For performance reasons, window.innerWidth should be checked on mounts and 
      // not as a dependency.
      const screenWidth = window.innerWidth;

      // Adjust numbers for your needs
      if (screenWidth < 576) {
        setBreakpoint('xs');
      } else if (screenWidth < 768) {
        setBreakpoint('sm');
      } else if (screenWidth < 992) {
        setBreakpoint('md');
      } else if (screenWidth < 1200) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    // Initial check on mount
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
