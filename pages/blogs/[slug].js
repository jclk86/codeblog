import PageLayout from 'components/PageLayout';
import { getAllBlogs, getBlogBySlug } from 'lib/api';


function BlogDetail({blog}) {

  // gets url information, with query matching the parameter in url
  // Not defined initially. So for render, need query.?slug or else will cause error for now. 
  // const { query } = useRouter(); was here. We don't need this here anymore because the 
    // getServerSideProps(context) is passed a context object with the params in it. 
    // blog.slug already has a slug.current field defined in lib/api blogField, which is why blog.slug works. 
  return (
    <PageLayout>
      <h1>Hello Detail Page - {blog.slug}</h1>
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

  // follow structure of getStaticPaths return 
  const paths = blogs?.map(blog => ({ params: { slug: blog.slug } }));

  return {
    paths: paths,
    // if page is not found
    fallback: false
  }
}

export default BlogDetail