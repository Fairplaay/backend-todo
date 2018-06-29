const express = require('express')
const router = express.Router()
const model = require('../model/task.js')()

router.get('/', (req, res, next) => {
  model.find({}, (err, task) => {
    if (err) throw err
    res.json(task)
  })
})

router.post('/add', (req, res, next) => {
  let body = req.body
  console.log(body)
  body.status = false
  model.create(body, (err, task) => {
    if (err) throw err
     res.redirect('/')
  })
})

router.put('/turn/:id', (req, res, netx) => {
  let id = req.params.id
  model.findById(id, (err, tasks) => {
    if (err) throw err
    tasks.status = !tasks.status
    tasks.save()
      .then(() => res.end())
  })
})

router.delete('/del/:id', (req, res, next) => {
  let id = req.params.id
  model.remove({_id: id}, (err, task) => {
    if (err) throw err
    res.end()
  })
})

module.exports = router
