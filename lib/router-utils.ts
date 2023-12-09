import { NextRouter } from 'next/router';

export const addQuery = (router: NextRouter, key: string, value: string | string[]) => {
  const { pathname, query } = router;
  const newQuery = {
    ...query,
    [key]: value.toString(),
  };
  router.replace({ pathname, query: newQuery }, undefined, { scroll: false });
};

export const removeQuery = (router: NextRouter, key: string) => {
  const { pathname, query } = router;
  const newQuery = { ...query };
  delete newQuery[key];
  router.replace({ pathname, query: newQuery }, undefined, { scroll: false });
};

const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://dfdurand.com';
};

export const getAbsoluteURL = (path: string) => {
  return getBaseUrl() + path;
};
