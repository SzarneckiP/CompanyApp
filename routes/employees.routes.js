const express = require('express');
const router = express.Router();
const Employees = require('../models/employees.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employees.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Department.findOne().skip(rand);
    if (!emp) res.status(404).json({ message: 'Not found..' });
    else res.json(emp);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employees.findById(req.params.id);
    if (!emp) res.status(404).json({ message: 'ok' });
    else res.json(emp);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const newEmployee = new Employees({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json(newEmployee);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const emp = await (Employees.findById(req.params.id));
    if (emp) {
      emp.firstName = firstName;
      emp.lastName = lastName;
      emp.department = department;
      await emp.save();
      res.json(emp);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const emp = await (Employees.findById(req.params.id));
    if (emp) {
      await Employees.remove({ _id: req.params.id });
      res.json(emp);
    }
    else res.status(404).json("Not found..");
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
