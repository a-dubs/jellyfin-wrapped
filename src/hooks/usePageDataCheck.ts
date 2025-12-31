import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNextPage } from '@/lib/page-flow';

interface UsePageDataCheckOptions<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  isEmpty?: (data: T) => boolean;
}

/**
 * Hook that automatically navigates to the next page if current page has no data.
 * This prevents empty sections from being displayed.
 */
export function usePageDataCheck<T>({
  data,
  isLoading,
  error,
  isEmpty = (d) => {
    if (d === null || d === undefined) return true;
    if (Array.isArray(d)) return d.length === 0;
    if (typeof d === 'object') return Object.keys(d).length === 0;
    return false;
  },
}: UsePageDataCheckOptions<T>) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only navigate if we're done loading, no error, and data is empty
    if (!isLoading && !error && isEmpty(data)) {
      const next = getNextPage(location.pathname);
      if (next) {
        void navigate(next);
      }
    }
  }, [isLoading, error, data, location.pathname, navigate, isEmpty]);

  return {
    shouldSkip: !isLoading && !error && isEmpty(data),
    nextPage: getNextPage(location.pathname),
  };
}
