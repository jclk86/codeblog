import client from './sanity';
// -> symbol references _ref
const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{name, 'avatar': avatar.asset->url},
  'coverImage': coverImage.asset->url,
`


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