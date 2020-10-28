import sanityClient from '@sanity/client';


const options = {
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production'
  // useCdn === true, gives faster response, but will give cached data 
  // useCdn === false, gives latest data. Response is a little slower. 
}

export default sanityClient(options);