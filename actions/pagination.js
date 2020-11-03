import { useEffect } from 'react';

import { useSWRPages } from 'swr';
import { useGetBlogs } from 'actions';
import { Col } from 'react-bootstrap';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';
// https://github.com/Jerga99/codeblog/commit/c598fb509cb422f53ab084609a0ed3892a276b31

// now uses useSWRInfinite - see above commit for changes
// blogs here is now considered intialData. Previously Home({ blogs: initialData }) in index.js
// this blogs: initialData will be passed in through in index.js or wherever you use this 
export const useGetBlogsPages = ({ blogs, filter }) => {
  // this only executes in browser environment
  useEffect(() => {
    // adds to window object (which is only avialable in browser) - we need this to have initial data sorted. 
    // no dependency, so runs once at time of render. 
    window.__pagination__init = true;
  }, []);

  return useSWRPages(
    'index-page', // this is just an id - whatever you want
    //this part fetches data that is from cache (for seo and faster rendering)
      // then you map through them to render them initially. 
      // remember: this offset is passed into it via the function below -- the third parameter function returns an offset
    ({ offset, withSWR }) => {
        // careful here: passing initialData will make it so you are passing the same cached data over and over
      // this can be fixed by differentiating browser environment and server, and determine when initial data is passed to request.
      
      // if no offset, then passing initial data. So will be determine when to supply initialData.
      // if offset, don't pass initial data.  
      let initialData = !offset && blogs;

      // deals with changes to initial data
      if(typeof window !== undefined && window.__pagination__init) {
        initialData = null; 
      }
      // withSWR? 
      const { data: paginatedBlogs  } = withSWR(useGetBlogs( { offset, filter }, initialData));
      
      if(!paginatedBlogs) { return 'Loading...'}

      // return components to display
      return paginatedBlogs
        .map(blog => 
        filter.view.list ? 
          <Col key={`${blog.slug}-list`} md="9">
            <CardListItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              link={{
                href: '/blogs/[slug]',
                as: `/blogs/${blog.slug}`
              }}
            />
          </Col>
          :
          <Col key={blog.slug} md="4">
            <CardItem 
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              image={blog.coverImage}
              link={{
                href: '/blogs/[slug]',
                as: `/blogs/${blog.slug}`
              }}
            />  
          </Col> 
        )
    },
    // Here (below) you will compute offset that will get passed into previous callback function with 'withSWR'
    // (so will be input into function above - it is the offset value)
    // SWR: data you will get from 'withSWR' function
    // index: number of current page (page you are currently on), which is 0, but you add 1 to it to make page 1 and to use below to multiply by 3. 
    (SWR, index) => { // this gets passed into next time we load and call this function. 
      // Initally null. 
      // data of previous request (SWR). Again, from initialData
      // below condition means all the data has been fetched. Nothing new. 
      if(SWR.data && SWR.data.length === 0) { return null; }
      // this returns offset, using index. Index represents the current page. 
      return  ( index + 1 ) * 3; // increment page by 1, then offset by 3. offset should increase by 3 each time.
    },
    // like useEffect, this is a dependency. Or useState. 
    // so we want this view to change based on the filtering
    [filter]
  )
}