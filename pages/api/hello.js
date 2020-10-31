// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// /api/filename 
// executes from server, so no CORS error. 
export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
