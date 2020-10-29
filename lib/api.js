import client from './sanity';
import imageUrlBuilder from '@sanity/image-url';

// -> symbol references _ref
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
  return builder.image(source)
}

export async function getAllBlogs() {
  const results = await client
    .fetch(`*[_type == "blog"]{ ${blogFields} }`);
  return results;
}

// fetch(query: 'string', params: QueryParams )
export async function getBlogBySlug(slug) {
  const results = await client
    .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset":asset->}
    }`, {slug})
    .then(res => res?.[0])

  return results; // as it returns an array, but with first and only item, since unique, but taken care of by then chain res
}
// {slug} is a query param and the placeholder is $slug in condition