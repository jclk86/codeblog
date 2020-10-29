import PageLayout from 'components/PageLayout';
import pagelayout from 'components/PageLayout';
import { useRouter } from 'next/router';


function BlogDetail() {
  // gets url information, with query matching the parameter in url
  // Not defined initially. So for render, need query.?slug or else will cause error for now. 
  const { query } = useRouter(); 

  return (
    <PageLayout>
      <h1>Hello Detail page at {query?.slug}</h1>
    </PageLayout>
  )
}

export default BlogDetail