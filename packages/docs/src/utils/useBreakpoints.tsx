import { useMedia } from 'react-use';

type Breakpoint = 'mobile' | 'tablet' | 'laptop';

const _ = {
  mobile: '(min-width: 0)',
  tablet: '(min-width: 768px)',
  laptop: '(min-width: 1200px)',
};

const useBreakpoints = (breakpoint: Breakpoint): boolean => {
  return useMedia(_[breakpoint]);
};

export default useBreakpoints;
