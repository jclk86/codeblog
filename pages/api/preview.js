import { getBlogBySlug } from 'lib/api';

async function enablePreview(req, res) {
  // takes the query values from browser / client end 
  // check secret - the studio requires the secret=password123! So you must make .env.local have this value
  if(req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({message: 'Invalid Token'});
  }

  // you want to fetch using getBlogBySlug from lib/api
  // without true (which is for preview), you can't preview unpublished blogs 
  const blog = await getBlogBySlug(req.query.slug, true);

  if(!blog) {
    res.status(401).json({message: 'Invalid Slug!'})
  }

  // Will set cookies to browser. By these cookies Next.js framework can identify that you would like to display page
    // in PREVIEW MODE
    // you can pass this function with preview data in object. But you can send it as empty object.  
    // "__prerender_bypass" & "__next_preview_data" in browser 
    // console under "application" and "cookies" tab. You will see a json token for __next_preview_data, but it's encrypted
    
    //***this api endpoint is executed through studio's "open preview" option and its values are passed to slug.js' getStaticProps({params, preview})
  // example: (to see how data flow is like - you will see it's available in browser and printed in studio terminal) 
  // res.setPreviewData({message: "hello world"});

  res.setPreviewData({});
  // redirect - overrides response header 
  // The Location response header indicates the URL to redirect a page to. 
  // It only provides a meaning when served with a 3xx (redirection) or 201 (created) status response.
  res.writeHead(307,{ Location: `/blogs/${blog.slug}` });

  return res.end();
}

export default enablePreview;

// Response headers provide information about the status of the request, and return ETag information. 
// The response also includes a status code. ... Use the headers to provide information about the entity 
// or other resource that you are requesting. The Decision Server Insights REST API supports the following HTTP headers.