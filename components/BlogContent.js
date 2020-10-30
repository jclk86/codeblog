import BlockContent from '@sanity/block-content-to-react';
import HighlightCode from 'components/HighlightCode';
import { urlFor } from 'lib/api';

// for code-input - rendering rich text format in react. Rich text is used for code here.
// props.node. node: is destructuring out language and code and filename
const serializers = {
  types: {
    code: ({node: { language, code, filename }}) => {
      return (
        <HighlightCode language={language}>
          {code}
          <div className="code-filename">{filename}</div>
        </HighlightCode>
      )
    },
    image: ({ node: { asset, alt, position = 'center' } }) => {
      // debugger; to see the props passed in here. That's how we know what to destructure
      // gets destructured with spread operator into the div className"blog-image"
      // let style = {};
      // if(position === 'left') {
      //   style.float = position;
      //   style.marginRight = '30px'
      // }

      // if(position === 'right') {
      //   style.float = position;
      //   style.marginLeft = '30px'
      // }

      // below uses css and class name instead with template string ${position}, so no styling code here. 

      // if you add your own custom img element here, the imageOptions styling no longer works.
      // urlFor(asset).url(). Not need for asset.url, smart enough to find url. url() returns explicit url
      return ( 
        <div className={`blog-image blog-image-${position}`}>
          <img src={urlFor(asset.url).height(300).fit('max').url()} />
          <div className="image-alt">{alt}</div>
        </div>
      )
    }
  }
}
// serializes content. Searches for the types defined and executes for those element types. ***
function BlogContent({content}) {
  return (
    <BlockContent 
      serializers={serializers}
      blocks={content}
    />
  )
}

export default BlogContent