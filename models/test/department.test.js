const Department = require('../department.model');
const { expect } = require('chai');
const mongoose = require('mongoose');

after(() => {
    mongoose.models = {};
});

describe('Department', () => {

    it('should trow an error if no "name" arg', () => {
        const dep = new Department({});

        dep.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should trow an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should throw an error if "name" is too short or too long', () => {
        const cases = ['Abc, abcd, Lorem Ipsum, Lorem Ip'];
        for (let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should not throw an error if "name" is ok', () => {
        const cases = ['Marketing', 'Testing'];
        for (let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err).to.not.exist;
            });
        }
    });
});