export default function handler(req,res) {
  console.log("preview")
  console.log(req.query.secret)
  console.log(res.query.token)
  res.setPreviewData({'token' : res.query.token})
  res.end("Preview mode enalbled")
}
