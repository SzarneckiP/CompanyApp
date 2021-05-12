const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');

router.get('/employees', employeesController.getAll);

router.get('/employees/random', employeesController.getRandom);

router.get('/employees/:id', employeesController.getById);

router.post('/employees', employeesController.post);

router.put('/employees/:id', employeesController.update);

router.delete('/employees/:id', employeesController.delete);

module.exports = router;
