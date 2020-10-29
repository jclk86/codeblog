import BlockContent from '@sanity/block-content-to-react';
import HighlightCode from 'components/HighlightCode';

// for code-input - rendering rich text format in react. Rich text is used for code.
// props.node
const serializers = {
  types: {
    code: ({node: { language, code, filename }}) => {
      return (
        <HighlightCode language={language}>
          {code}
          <div className="code-filename">{filename}</div>
        </HighlightCode>
      )
    }
  }
}

function BlogContent({content}) {
  return (
    <BlockContent 
      imageOptions={{w: 320, h: 240, fit: 'max'}}
      serializers={serializers}
      blocks={content}
    />
  )
}

export default BlogContent