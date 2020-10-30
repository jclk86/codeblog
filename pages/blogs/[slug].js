import PageLayout from 'components/PageLayout';
import BlogHeader from 'components/BlogHeader';
import BlogContent from 'components/BlogContent';
import { getAllBlogs, getBlogBySlug } from 'lib/api';
import { Row, Col } from 'react-bootstrap';
import { urlFor } from 'lib/api';

function BlogDetail({blog}) {

  // gets url information, with query matching the parameter in url
  // Not defined initially. So for render, need query.?slug or else will cause error for now. 
  // const { query } = useRouter(); was here. We don't need this here anymore because the 
    // getServerSideProps(context) is passed a context object with the params in it. 
    // blog.slug already has a slug.current field defined in lib/api blogField, which is why blog.slug works. 
  return (
    <PageLayout>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={blog.date}
          />
          <hr/>
          <BlogContent 
            content={blog.content} //bc api has content appended in query. see lib/api
          />
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
// params is from context. Has a params property. We use it in getBlogBySlug and pass that blog
// to props in above component
export async function getStaticProps({params}) {

  const blog = await getBlogBySlug(params.slug);
  return {
    props: {
      blog
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
    fallback: false
  }
}

export default BlogDetail