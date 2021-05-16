const Employees = require('../employees.model');
const { expect } = require('chai');
const mongoose = require('mongoose');

after(() => {
    mongoose.models = {};
});

describe('Employees', () => {

    it('should return error if no "firstName, lastName, department" arg', () => {
        const emp = new Employees({});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should return an error if "firstName, lastName and department" are not a string', () => {
        const cases = [{}, []];
        for (let args of cases) {
            const emp = new Employees({ args });

            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not return an error if " firstName, lastName and department" are ok', () => {
        const emp = new Employees({ firstName: 'John', lastName: 'Doe', department: 'Testing' });

        emp.validate(err => {
            expect(err).to.not.exist;
        });
    });

});