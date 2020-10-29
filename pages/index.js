import { Row, Col } from 'react-bootstrap';
import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';
import { getAllBlogs } from 'lib/api';

function Home({ blogs }) {
  // debugger - hover on blog in inspect and go to sources + reload to see object
  return (
    <PageLayout>
      <AuthorIntro />
      <hr/>
      <Row className="mb-5">
       {/* <Col md="10">
          <CardListItem />
          </Col> */}
        
      { blogs.map(blog => 
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
  const blogs = await getAllBlogs();
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

