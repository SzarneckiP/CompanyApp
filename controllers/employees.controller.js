const Employees = require('../models/employees.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Employees.find().populate('department'));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Employees.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const emp = await Employees.findOne().skip(rand).populate('department');
        if (!emp) res.status(404).json({ message: 'Not found..' });
        else res.json(emp);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const emp = await Employees.findById(req.params.id).populate('department');
        if (!emp) res.status(404).json({ message: 'ok' });
        else res.json(emp);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.post = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    try {
        const newEmployee = new Employees({ firstName: firstName, lastName: lastName, department: department });
        await newEmployee.save();
        res.json(newEmployee);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.update = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    try {
        const emp = await (Employees.findById(req.params.id).populate('department'));
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
};

exports.delete = async (req, res) => {
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
};