import { useState } from 'react';
import { Row, Button } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import FilteringMenu from 'components/FilteringMenu';
import PreviewAlert from 'components/PreviewAlert';

import { useGetBlogsPages } from 'actions/pagination';
import { getPaginatedBlogs } from 'lib/api';
// import { useGetBlogs } from 'actions'; - moved to actions.pagination

// We want to pass this in so it makes our useSWR more reusable. You could decide to use axios. 
// PLACED IN ACTIONS FOLDER
// const fetcher = (url) => fetch(url).then(res => res.json());

// blogs: initialData destructures the object provided by getStaticProps and assigns the value 
  // to initialData. Then this initialData is sent into the useSWR, which is useGetBlogs here. 
  // useSWR(unique ID, fetcher, initialData ) => useSWR('api/blogs', fetcher, { initialData })
  // was home({ blogs: initialData }) - changed with pagination lesson
function Home({ blogs, preview }) {
  // debugger - hover on blog in inspect and go to sources + reload to see object
  const [filter, setFilter ] = useState({
    view: { list : 0 }, // 0 = card view. 1 = list view.
    date: { asc: 0 } 
  });
  
  // useGetBlogs catches the initial props values and then executes the fetcher that's passed through,
  // which sues the api/blogs route to get new up-to-date data/blogs
  // const { data: blogs, error } = useGetBlogs(initialData); - MOVED to actions/pagination
  
  //********************************************************** */
  // ALL PLACED IN ACTIONS FOLDER NOW - hook function (a function that wraps around a hook) gets imported here
  // and destructured. See above. 

  // https://swr.vercel.app/ on useSWR (REFERENCE DOC)
  // this brings up a cross origin error becuase request is coming from different different port.
  // hostname and port must match the server. You have localhost:3333 and localhost:3000
  // getStaticPaths, props, server are all called in NODE.js environment, hence no cross origin error
  // useEffect(() => {
  //   async function fetchBlogs() {
  //     const blogs = await getAllBlogs();
  //     return blogs;
  //   }

  //   fetchBlogs();
  // }, []);
  // alternative way above does not work due to cors. Below uses route in api folder, which runs from server.
  // the api route is automatically configured, just like pages and its routes. 
  // we're using native fetch as fetcher from Next.js. No need to import fetch. Next.js has it already
  // const { data, error } = useSWR('/api/hello', fetcher);
  
  //********************************************************** */

  // blogs and filter passed from above
  // these 4 are provided from useSWRPages 
  const {
    pages, // components returned from useGetBlogsPages - use below to be rendered, as useGetBlogsPages from actions/pagination returns a component
    isLoadingMore, // boolean - is true whenever we are making request to fetch data
    isReachingEnd, // boolean - is true when we loaded all of the data, data is empty array. 
    loadMore // function to load more data. Will re-execute the second parameter callback function in useSWRPages
  } = useGetBlogsPages({blogs, filter});

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <FilteringMenu 
        filter={filter} // state passed down
        onChange={(option, value) => 
          setFilter({...filter, [option]: value })
        }
      />
      <hr/>
      <Row className="mb-5">
        { pages }
      </Row>
      <div style={{textAlign: 'center'}}>
        <Button
          onClick={loadMore} // from loadMore above in useGetBlogs
          disabled={isReachingEnd || isLoadingMore} // if in process of loading more data, can't keep pressing it
          size="lg"
          variant="outline-secondary"
        >
          {isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More Blogs'}
        </Button>
      </div>
    </PageLayout>
  )
}

export default Home

// This function is called during the build (build time)
// Provides props to your page
// It will create static page  

// You need preview here cause once you're in api/preview route, the entire site is under preview mode
export async function getStaticProps({preview = false}) {
  // offset how much data to skip... This method prevents hardcoding [0...5] 
  // from slice operation in query of lib/api.js
  const blogs = await getPaginatedBlogs( { offset: 0, date: 'desc' } );
  return {
    props: {
      blogs,
      preview
    }
  }
}

// ****************************** getServerSideProps() **********************
// This example shows dynamically rendered pages, which are built upon request
// executes each time at request, and builds and serves up new html/page
// Above example with getStaticProp builds the html, js and css and then caches it
// and serves up the same html, js, css from that build. In order for it to change
// is for you to run yarn run build or npm run build.

// export async function getServerSideProps() {
//   const randomNumber = Math.random(); 
//   const blogs = await getAllBlogs();
//   return {
//     props: {
//       blogs,
//       randomNumber
//     }
//   }
// }

//********************************************************************* */

// Static Page
// Faster, can be cached using CDN
// Created at build time
// When we make the request we are always receiving the same html document

// Dynamic Page 
// Created at request time (we can fetch data on server)
// Little bit slower. The time depends on the data you are fetching. 

