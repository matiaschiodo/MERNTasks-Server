const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

// api/tasks
router.post('/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('project', 'Project is required').not().isEmpty()
  ],
  taskController.createTask
)

router.get('/',
  auth,
  taskController.getTasks
)

router.put('/:id',
  auth,
  taskController.updateTask
)

router.delete('/:id',
  auth,
  taskController.deleteTask
)

module.exports = router