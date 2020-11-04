import client from './sanity';
import imageUrlBuilder from '@sanity/image-url';

// -> symbol references _ref
// ensure blogFields ends in comma. Or you'll have to add a comma in a fetch if you add any other fields
// not included in this template strong.
const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{name, 'avatar': avatar.asset->url},
  coverImage,
`
// 'coverImage': coverImage.asset->url - because imageUrlBuilder needed more info passed
  // so need coverImage object. Not just url. 
const builder = imageUrlBuilder(client);

// sanity doc imageUrl 
export function urlFor(source) {
  return builder.image(source);
}


export async function getAllBlogs() {
  // order() see docs how to order
  const results = await client
    .fetch(`*[_type == "blog"] | order(date desc) {${blogFields}}`);
  return results;
}


// the offset makes the slice operation of query much more flexible. 
// here you have chosen to offset by threes. 
// we need a default offset value bc in pages/api/blogs, getAllBlogs() is invoked without a value pass in
// { offset = 0, date  = 'desc' } is initial value 
// offset = how much data to skip
// limit = how much data to fetch - see if you can implement dynamical offsets
export async function getPaginatedBlogs({ offset = 0, date  = 'desc' } = { offset: 0, date: 'desc' }) {
  // order() see docs how to order
  const results = await client
    .fetch(`*[_type == "blog"] | order(date ${date}) {${blogFields}}[${offset}...${offset + 6}]`);
  return results;
}

// fetch(query: 'string', params: QueryParams ) {slug} is the QueryParams below
// you can actually place content[] in blogfield above. it's just adding on to string/query
export async function getBlogBySlug(slug) {
  const results = await client
    .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset":asset->}
    }`, {slug})
    .then(res => res?.[0]);

  return results; // as it returns an array, but with first and only item, since unique, but taken care of by then chain res
}
// {slug} is a query param and the placeholder is $slug in condition