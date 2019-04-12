const userRepository = require("../repositories/UserRepository");
// setup mocha and chai

process.env.APP_ENV = 'itest';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const agent = chai.request.agent(app);
const expect = require('chai').expect;
const should = require('chai').should();

describe("Integration Tests", function () {

    //Test to get all courses
    it("GET users/api/courses; body should be empty because no login yet", (done) => {
        agent.get('/users/api/courses')
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.be.eql({});
                done();
            });
    });

    it("POST /login, login should be successful", (done) => {
        agent.post('/login')
            .send({username: 'aa', password: 'aa'})
            .then(function (res) {
                res.should.have.status(200);
                done();
            });
    });

    it("GET users/api/courses, should return all courses (length 2) because manager logged in", (done) => {
        agent.get('/users/api/courses')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(2);
                done();
            });

    });

    it("GET users/api/ctrainers, should return all courses_trainer pairings (length 1) because manager logged in", (done) => {
        agent.get('/users/api/ctrainers')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(1);
                done();
            });

    });

    it("GET users/api/ctrainees, should return all courses_trainee pairings (length 1) because manager logged in", (done) => {
        agent.get('/users/api/ctrainees')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(1);
                done();
            });

    });

    it("GET users/api/trainers, should return all trainers (length 2) because manager logged in", (done) => {
        agent.get('/users/api/trainers')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(2);
                done();
            });

    });

    it("GET users/api/trainees, should return all trainees (length 2) because manager logged in", (done) => {
        agent.get('/users/api/trainees')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(2);
                done();
            });

    });

    it("GET users/api/course/:course_id/skills, should return skills of course with id = 1. Length of skills should be 3", (done) => {
        agent.get('/users/api/course/1/skills')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(3);
                done();
            });

    });

    it("GET users/api/course/:course_id/skills, should return empty body because course with id = 2 doesn't have skills", (done) => {
        agent.get('/users/api/course/2/skills')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body.length).to.eql(0);
                done();
            });

    });

    it("GET users/api/course/:course_id/skills/sessions, should return skills of course with id = 1 (in sessions table). skill_id should equal 1", (done) => {
        agent.get('/users/api/course/1/skills/sessions')
            .then(function (res) {
                res.should.have.status(200);
                let skill = res.body;
                expect(skill[0].skill_id).to.eql(1);
                done();
            });

    });

    it("GET users/api/:skill_id/sessions, should throw sequelize error because trainee is not logged in", (done) => {
        agent.get('/users/api/1/sessions')
            .then(function (res) {
                expect(JSON.stringify(res.body)).to.contain("ER_BAD_FIELD_ERROR");
                done();
            });

    });

    it("GET users/api/:session_id/score, should return score of session with id = 1", (done) => {
        agent.get('/users/api/1/score')
            .then(function (res) {
                expect(res.body.length).to.eql(2);
                done();
            });

    });

    after(async function () {
        agent.close();
        await userRepository.closeDBConnection();
        require('../app').stop();
    })
});