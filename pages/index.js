import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';
import FilteringMenu from 'components/FilteringMenu';

import { getAllBlogs } from 'lib/api';
import { useGetBlogs } from 'actions';

// We want to pass this in so it makes our useSWR more reusable. You could decide to use axios. 
// PLACED IN ACTIONS FOLDER
// const fetcher = (url) => fetch(url).then(res => res.json());

// blogs: initialData destructures the object provided by getStaticProps and assigns the value 
  // to initialData. Then this initialData is sent into the useSWR, which is useGetBlogs here. 
  // useSWR(unique ID, fetcher, initialData ) => useSWR('api/blogs', fetcher, { initialData })
function Home({ blogs: initialData }) {
  // debugger - hover on blog in inspect and go to sources + reload to see object
  const [filter, setFilter ] = useState({
    view: { list : 0 } // 0 = card view. 1 = list view. 
  })
  
  // useGetBlogs catches the initial props values and then executes the fetcher that's passed through,
  // which sues the api/blogs route to get new up-to-date data/blogs
  const { data: blogs, error } = useGetBlogs(initialData);
  
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
  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu 
        filter={filter} // state passed down
        onChange={(option, value) => {
          setFilter({...filter, [option]: value })
        }}
      />
      <hr/>
      <Row className="mb-5">
        { blogs.map(blog => 
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
        }
      </Row>
    </PageLayout>
  )
}

export default Home

// This function is called during the build (build time)
// Provides props to your page
// It will create static page  
export async function getStaticProps() {
  // offset how much data to skip... This method prevents hardcoding [0...5] 
  // from slice operation in query of lib/api.js
  const blogs = await getAllBlogs( { offset: 0 } );
  return {
    props: {
      blogs
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

