const userRepository = require("../repositories/UserRepository");
//setup chai

process.env.APP_ENV = 'itest';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const agent = chai.request.agent(app);
const expect = require('chai').expect;
const should = require('chai').should();

describe("Integration Tests", function () {

    //ADMIN LOGGED IN
    it("POST /login, login should be successful", (done) => {
        agent.post('/login')
            .send({username: 'admin', password: 'pass'})
            .then(function (res) {
                res.should.have.status(200);
                res.should.redirect;
                done();
            });
    });

    it("POST /registerUser, user should not be registered. Username already exists should be thrown", (done) => {

        let regUser = {
            first_name: 'TestUser1',
            last_name: 'TestUser1',
            username: 'aa',
            password: 'aa',
            address: '123 ABC Street',
            phone: '123',
            email: 'testuser@gmail.com',
            admin_role: 'off',
            manager_role: 'off',
            trainer_role: 'off',
            trainee_role: 'on'
        };

        agent.post('/registerUser')
            .send(regUser)
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Username already in use. Please change it');
                done();
            });
    });

    it("POST /registerUser, user should not be registered. Email already exists should be thrown", (done) => {

        let regUser = {
            first_name: 'TestUser1',
            last_name: 'TestUser1',
            username: 'TestUser1',
            password: 'aa',
            address: '123 ABC Street',
            phone: '123',
            email: 'aa@gmail.com',
            admin_role: 'off',
            manager_role: 'off',
            trainer_role: 'off',
            trainee_role: 'on'
        };

        agent.post('/registerUser')
            .send(regUser)
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Email already in use. Please change it');
                done();
            });


    });

    it("POST /registerUser, user should successfully be be registered IF Unit Test Was run before this", (done) => {

        let regUser = {
            first_name: 'TestUser1',
            last_name: 'TestUser1',
            username: 'TestUser1',
            password: 'aa',
            address: '123 ABC Street',
            phone: '123',
            email: 'TestUser1@gmail.com',
            admin_role: 'off',
            manager_role: 'off',
            trainer_role: 'off',
            trainee_role: 'on'
        };

        agent.post('/registerUser')
            .send(regUser)
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Successfully Registered New User');
                done();
            });


    });

    it("GET /logout, should logout the user and destroy the session", (done) => {
        agent.get('/logout')
            .redirects(0)
            .then(function (res) {
                res.should.have.status(302);
                done();
            });

    });

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
                expect(res.body.length).to.eql(3);
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

    it("GET users/api/sessions/:trainer_id/:course_id/:skill_id/:trainee_id, should return all sessions of this trainer, course, skill and trainee", (done) => {
        agent.get('/users/api/sessions/1/1/1/1')
            .then(function (res) {
                expect(res.body.length).to.eql(1);
                done();
            });

    });

    it("POST /addCourse, course should successfully be added", (done) => {

        let course = {
            course_name: 'Communications 101',
            semester: 'Winter',
            year: 202
        };

        agent.post('/addCourse')
            .send(course)
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Successfully added the course!');
                done();
            });


    });

    it("POST /addSkill, skill should successfully be added to course", (done) => {

        let skillObj = {
            courses: '3',
            skillname: 'CC-1'
        };

        agent.post('/addSkill')
            .send(skillObj)
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Successfully added the skill!');
                done();
            });

    });

    it("POST /addCriteria, criteria should successfully be added to skill", (done) => {


        let criteriaAmountRange = '2';
        let criteria2 = 'CC-1 Test Criteria 2';
        let criteriaType2 = 'Extra';
        let criteria_courses = '3';
        let criteria_skills = '4';
        let criteria1 = 'CC-1 Test Criteria 1';
        let criteriaType1 = 'Essential';


        agent.post('/addCriteria')
            .send({
                criteriaAmountRange,
                criteria_courses,
                criteria_skills,
                criteria1,
                criteriaType1,
                criteria2,
                criteriaType2
            })
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Successfully added the Criteria!');
                done();
            });

    });

    it("POST /assign-course, course should successfully be assigned to instructor", (done) => {

        let schedule_courses = '3';
        let ctt_trainer_id = '2';

        agent.post('/assign-course')
            .send({schedule_courses, ctt_trainer_id})
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Successfully assigned the course to the instructor!');
                done();
            });

    });

    it("POST /assign-course-trainee, trainees should be registered to a course", (done) => {

        let schedule_courses = '3';
        let selectedTraineesArray = '2,3';

        agent.post('/assign-course-trainee')
            .send({schedule_courses, selectedTraineesArray})
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('Successfully assigned the course to the student(s)!');
                done();
            });

    });

    it("GET /logout, should logout the user and destroy the session", (done) => {
        agent.get('/logout')
            .redirects(0)
            .then(function (res) {
                res.should.have.status(302);
                done();
            });

    });

    it("GET users/api/courses; body should be empty because no login after last logout", (done) => {
        agent.get('/users/api/courses')
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.be.eql({});
                done();
            });
    });


    //TRAINEE LOGGED IN
    it("POST /login, login should be successful", (done) => {
        agent.post('/login')
            .send({username: 'adel', password: 'aa'})
            .then(function (res) {
                res.should.have.status(200);
                res.should.redirect;
                done();
            });
    });

    it("GET /users/api/:skill_id/sessions, should return all sessions of this trainee who logged and skill (length 1)", (done) => {
        agent.get('/users/api/1/sessions')
            .then(function (res) {
                expect(res.body.length).to.eql(1);
                done();
            });

    });

    it("GET /logout, should logout the user and destroy the session", (done) => {
        agent.get('/logout')
            .redirects(0)
            .then(function (res) {
                res.should.have.status(302);
                done();
            });

    });

    //TRAINER LOGGED IN
    it("POST /login, login should be successful", (done) => {
        agent.post('/login')
            .send({username: 'allaa', password: 'aa'})
            .then(function (res) {
                res.should.have.status(200);
                res.should.redirect;
                done();
            });
    });

    it("GET users/api/sessions/:course_id/:skill_id/:trainee_id, should return all sessions of this current logged in trainer, course, skill and trainee", (done) => {
        agent.get('/users/api/sessions/1/1/1')
            .then(function (res) {
                expect(res.body.length).to.eql(1);
                done();
            });

    });

    it("POST /add-session-comment, comment should be added successfully", (done) => {

        let commentSessionId = 1;
        let sessionComment = "Test session comment trainer";

        agent.post('/add-session-comment')
            .send({commentSessionId, sessionComment})
            .then(function (res) {
                res.should.have.status(200);
                expect(JSON.stringify(res)).to.contain('success');
                done();
            });

    });

    it("GET /logout, should logout the user and destroy the session", (done) => {
        agent.get('/logout')
            .redirects(0)
            .then(function (res) {
                res.should.have.status(302);
                done();
            });

    });







    after(async function () {
        agent.close();
        await userRepository.closeDBConnection();
        require('../app').stop();
    })
});