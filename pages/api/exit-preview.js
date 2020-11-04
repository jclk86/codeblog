

// no need for req here
export default function exitPreview(_,res) {
  // clear cookies
  res.clearPreviewData();

  // redirect
  res.writeHead(307, { Location: '/'});
  res.end();
}

// add this route to PreviewAlert component 