const { expect } = require('chai');
const Employees = require('../employees.model');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employees CRUD', () => {

    before(async () => {
        try {
            const fakeDB = new MongoMemoryServer();
            const uri = await fakeDB.getUri();
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: 'Testing' });
            await testEmpOne.save();

            const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'Nothing' });
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employees.find();

            expect(employees.length).to.be.equal(1);
        });

        it('should return proper document by various params with "findOne" method', async () => {
            const employee = await Employees.findOne({ firstName: 'John' });
            const expectedFirstName = 'John';
            expect(employee.firstName).to.be.equal(expectedFirstName);
        });
        afterEach(async () => {
            await Employees.deleteMany();
        });
    });

    describe('Creating Data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: 'Testing' });
            await testEmpOne.save();

            const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
            await testEmpTwo.save();
        });

        it('should insert new document with "insertOne" method.', async () => {
            const employee = new Employees({ firstName: 'John', lastName: 'Doe', department: 'Testing' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        afterEach(async () => {
            await Employees.deleteMany();
        });
    });

    describe('Updating Data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: 'Testing' });
            await testEmpOne.save();

            const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
            await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method,', async () => {
            await Employees.updateOne({ firstName: 'john' }, { $set: { firstName: 'John' } });
            const updatedEmployee = await Employees.findOne({ firstName: 'John' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method,', async () => {
            const employee = await Employees.findOne({ firstName: 'John' });
            employee.firstName = 'Izydor';
            await employee.save();

            const updatedEmployee = await Employees.findOne({ firstName: 'Izydor' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method.', async () => {
            await Employees.updateMany({}, { $set: { firstName: 'Updated!' } });
            const employees = await Employees.find({ firstName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });

        afterEach(async () => {
            await Employees.deleteMany();
        });
    });

    describe('Removing Data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: 'Testing' });
            await testEmpOne.save();

            const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
            await testEmpTwo.save();
        });

        it('should properly remove one document with "deleteOne" method,', async () => {
            await Employees.deleteOne({ firstName: 'John' });
            const removedEmployee = Employees.findOne({ firstName: 'John' });
            expect(removedEmployee).to.not.be.null;
        });

        it('should properly remove one document with "remove" method,', async () => {
            const employee = await Employees.findOne({ firstName: 'John' });
            await employee.remove();
            const removedEmployee = await Employees.findOne({ firstName: 'John' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method.', async () => {
            await Employees.deleteMany();
            const removedEmployees = await Employees.find();
            expect(removedEmployees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employees.deleteMany();
        });
    });

});