const express = require('express')
const app = express()
const port = 3000

app.get('/user/:id', (req, res) => {
//     const q = req.params
//   console.log(q.id) 
const q=req.query
console.log(q.q)
console.log(q.name)
  res.json({'userid':q.id})
})

app.get('/dog', (req, res) => {
    res.send('강아지지')
  })

app.get('/cat', (req, res) => {
    res.send({'sound':'멍멍'})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})