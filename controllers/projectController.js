const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const project = new Project(req.body)
    project.creator = req.user.id
    project.save()
    res.status(201).json(project)
  } catch(error) {
    console.log(error)
    res.send(500).send('There was an error')
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id })
    res.json({ projects })
  } catch(error) {
    console.log(erorr)
    res.status(500).send('There was an error')
  }
}

exports.updateProject = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name } = req.body
  const newProject = {}
  if(name) {
    newProject.name = name
  }

  try {
    let project = await Project.findById(req.params.id)
    if(!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    if(project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    project = await Project.findOneAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true })

    res.json({ project })
  } catch(error) {
    console.log(error)
    res.status(500).send('Server error')
  }
}

exports.deleteProject = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    let project = await Project.findById(req.params.id)
    if(!project) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    if(project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Project.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Project deleted' })
  } catch(error) {
    console.log(error)
    res.status(500).send('Server error')
  }
}