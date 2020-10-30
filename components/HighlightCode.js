import highlight from 'highlight.js';
import { createRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';


function HighlightCode({ children, language }) {
  // createRef() receives the underlying DOM element as its current property. 
  // When the ref attribute is used on a custom class component, 
  // the ref object receives the mounted instance of the component as its current. 
  // You may not use the ref attribute on function components because they don't have instances.
  const code = createRef();

  useEffect(() => {
    // debugger
    highlight.highlightBlock(findDOMNode(code.current));
  }, [])

  return (
    <pre>
      <code
        ref={code}
        className={language}
      >
        {children}
      </code>
    </pre>
  )
}

export default HighlightCode