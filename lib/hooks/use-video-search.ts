import { useMemo } from 'react';

import { useSearchParams } from './use-search-params';
import { allVideos } from '../contentlayer-utils';
import { search } from '../match-sorter';
import { sortByPublishedDateDescending } from '../sort';

export const useVideoSearch = () => {
  const { setParams, searchString, filters } = useSearchParams();

  const results = useMemo(() => {
    return search(allVideos, ['localized.title', 'localized.description'], searchString).sort(
      sortByPublishedDateDescending,
    );
  }, [searchString]);

  return {
    defaultValue: searchString ?? '',
    filters,
    isEmptyResult: results.length === 0,
    results: results,
    setParams,
  };
};
