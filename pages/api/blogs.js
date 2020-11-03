import { getAllBlogs } from 'lib/api';

// What the server responds with for the blogs route. 
export default async function getBlogs(req, res) {
  // offset from actions/index. || 0 is set just in case for some reason offset is missing.
  // And remember, parameters are all strings 
  // 10 is the decimal system - 10 based 
  const offset = parseInt((req.query.offset || 0), 10); // see actions/index for route that executes this.
  const date = req.query.date || 'desc'; // optional || to be careful if nothing is sent
  const data = await getAllBlogs({offset, date});
  res.status(200).json(data);
}