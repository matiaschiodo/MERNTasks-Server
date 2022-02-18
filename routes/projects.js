const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

// api/projects
router.post('/',
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  auth,
  projectController.createProject
)

router.get('/',
  auth,
  projectController.getProjects
)

router.put('/:id',
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  auth,
  projectController.updateProject
)

router.delete('/:id',
  auth,
  projectController.deleteProject
)

module.exports = router