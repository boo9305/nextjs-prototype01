// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function hello(req, res) {
  console.log("hello")
  res.statusCode = 200
  res.json({ name: 'John Doe' })
  res.end(JSON.stringify({ name : 'John Doe'}))
}
