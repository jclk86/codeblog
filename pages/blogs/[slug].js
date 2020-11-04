import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import PageLayout from 'components/PageLayout';
import BlogHeader from 'components/BlogHeader';
import PreviewAlert from 'components/PreviewAlert';
import BlogContent from 'components/BlogContent';

import { urlFor } from 'lib/api';
import { getAllBlogs, getBlogBySlug } from 'lib/api';

import { Row, Col } from 'react-bootstrap';
import moment from 'moment';


function BlogDetail({blog, preview}) {
  const router = useRouter();

  // this addressed getPaginatedBlogs, where a blog beyond offset isn't fetched due to offset. 
  // So check if this page is a fallback page using router. This is not a fallback page, so we 
  // want to display 404 error page (next offers error page component you can import)
  //https://nextjs.org/docs/basic-features/data-fetching
  // fallback allows for small group of data to be generated first. Then, if set to true, and user
    // requests more data, a loading screen appears to allow getStaticProps to finish and render the requested data. 
    // However, fallback will not update generated pages. You need Static Regeneration for that
  if(!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />
  }

  if(router.isFallback) {

    return (
      <PageLayout className="blog-detail-page">
        Loading...
      </PageLayout>
    )
  }

  // gets url information, with query matching the parameter in url
  // Not defined initially. So for render, need query.?slug or else will cause error for now. 
  // const { query } = useRouter(); was here. We don't need this here anymore because the 
    // getServerSideProps(context) is passed a context object with the params in it. 
    // blog.slug already has a slug.current field defined in lib/api blogField, which is why blog.slug works. 
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={moment(blog.date).format('LLL')}
          />
          <hr/>
          {/* bc api has content appended in query. see lib/api */}
          { blog.content && <BlogContent content={blog.content} />}
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Col>
      </Row>
    </PageLayout>
  )
}


// we typically want a blog to be static, because it won't get data frequently that changes it 
// Should be getStaticProps
// Remember: this is the prop object that gets passed into component above. 
// export async function getServerSideProps({params}) {
 
//   const blog = await getBlogBySlug(params.slug);
//   return {
//     props: {
//       blog
//     }
//   }
// }
// params and preview are from context. Has a params property. We use it in getBlogBySlug and pass that blog
// This is props for each page. And provided to component above, so destructure anything 
  // from above props object that you gave it via getStaticProps
// to props in above component
// https://nextjs.org/docs/basic-features/data-fetching
// receives preview and previewData from pages/api
export async function getStaticProps({params, preview = false, previewData }) {
  // console.log("Preview is ", preview)
  // console.log("previewData: ", previewData)
  // TODO: pass preview to getBlogBySlug and fetch draft blog
  // this API fetch determines which sanity client to fetch from depending on preview value
    // and returns it. The draft data is literally live/freshest form data (no need to hit publish)
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: {
      blog,
      preview
    }
  }
}
// used with dynamic routes. Gets list of defined paths and renders html of those paths at build time.
// executed during build before getStaticProps
export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  
  // follow structure of getStaticPaths return to override
  const paths = blogs?.map(blog => ({ params: { slug: blog.slug } }));

  return {
    paths: paths,
    // if page is not found
    // if false, provides 404 error page
    // if true, tries to refetch the blogs using the slug
    fallback: true
  }
}

export default BlogDetail