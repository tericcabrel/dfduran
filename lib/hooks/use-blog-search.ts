import { useMemo } from 'react';

import { allBlogs } from 'contentlayer/generated';

import { useSearchParams } from './use-search-params';
import { getBlogTags } from '../contentlayer-utils';
import { search } from '../match-sorter';
import { sortByPublishedDateDescending } from '../sort';

export const useBlogSearch = () => {
  const { setParams, searchString, addFilter, removeFilter, filters } = useSearchParams();

  const results = useMemo(() => {
    return search(allBlogs, ['title', 'description', 'tags', 'host'], searchString);
  }, [searchString]);

  const resultsByTags = useMemo(() => {
    if (filters.length === 0) {
      return results;
    }

    return results.filter((result) => (result.tags ?? []).some((cat) => filters.includes(cat)));
  }, [results, filters]);

  return {
    addTag: addFilter,
    allTags: getBlogTags(),
    defaultValue: searchString || '',
    filters,
    hasFilter: filters.length > 0,
    hasQuery: searchString !== '',
    isEmptyResult: results.length === 0,
    removeTag: removeFilter,
    results: resultsByTags.sort(sortByPublishedDateDescending),
    setParams,
    tags: getBlogTags(results),
  };
};
