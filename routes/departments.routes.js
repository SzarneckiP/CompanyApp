const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departments.controller');

router.get('/departments', departmentController.getAll);

router.get('/departments/random', departmentController.getRandom);

router.get('/departments/:id', departmentController.getById);

router.post('/departments', departmentController.post);

router.put('/departments/:id', departmentController.update);

router.delete('/departments/:id', departmentController.delete);

module.exports = router;
