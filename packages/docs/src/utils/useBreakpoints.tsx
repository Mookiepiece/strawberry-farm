import { useMedia } from 'react-use';

type Breakpoint = 'mobile' | 'tablet' | 'tablet-' | 'laptop' | 'laptop-';

const _ = {
  mobile: '(min-width: 0)',
  'tablet-': '(max-width: 767px)',
  tablet: '(min-width: 768px)',
  'laptop-': '(max-width: 1119px)',
  laptop: '(min-width: 1200px)',
};

const useBreakpoints = (breakpoint: Breakpoint): boolean => {
  return useMedia(_[breakpoint]);
};

export default useBreakpoints;
