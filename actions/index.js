import useSWR from 'swr';
// think user actions
const fetcher = (url) => fetch(url).then(res => res.json());
// https://codeconqueror.com/blog/next-js-content-management-system-cms

// The idea is to use a new caching directive stale-while-revalidate which says: serve a stale result, 
// but simultaneously validate whether the underlying resource has been updated or not.
// Serverside rendering isn't as fast. 
export const useGetHello = () => useSWR('/api/hello', fetcher);

// being used in pagination. need offset parameter here so we can pass an offset in pagination.js
// filter is passed through so we have access to date 
export const useGetBlogs = ({ offset, filter }, initialData) => { 
  return useSWR(`
  /api/blogs?offset=${offset || 0 }&date=${filter.date.asc ? 'asc' : 'desc'}`, 
  fetcher, 
  { initialData }); // offset || 0, so not passing null
}