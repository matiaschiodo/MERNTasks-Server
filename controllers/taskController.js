const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { project } = req.body

    const projectExist = await Project.findById(project)
    if(!projectExist) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    if(projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    const task = new Task(req.body)
    await task.save()
    res.status(201).json({ task })

  } catch(error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

exports.getTasks = async (req, res) => {
  try {
    const { project } = req.body

    const projectExist = await Project.findById(project)
    if(!projectExist) {
      return res.status(404).json({ msg: 'Project not found' })
    }

    if(projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    const tasks = await Task.find({ project })
    res.status(200).json({ tasks })
  } catch(error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { project, name, status } = req.body

    let task = await Task.findById(req.params.id)
    if(!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }

    const projectExist = await Project.findById(project)

    if(projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    const newTask = {}
    if(name) newTask.name = name
    if(status) newTask.status = status

    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true })
    res.status(202).json({ task })
  } catch(error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.body

    let task = await Task.findById(req.params.id)
    if(!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }

    const projectExist = await Project.findById(project)

    if(projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Task.findOneAndRemove({ _id: req.params.id })
    res.status(202).json({ msg: 'Deleted task' })
  } catch(error) {
    console.log(error)
    res.status(500).send('There was an error')
  }
}