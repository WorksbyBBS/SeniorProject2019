const userRepository = require("../models/UserRepository");
const courseRepository = require("../models/CourseRepository");
// setup mocha and chai

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

describe("Repository Methods Unit Tests", function () {
    before(async function () {
        await userRepository.connectAndCreateToDB().then(async function () {
            console.log('success')
        }).catch(e => {
            console.log(e);
        });
    });

    describe("[UserRepository]", function () {
        it("1. The function registerUser() should register Admin Users", async function () {
            let AdminCountBefore = await userRepository.countAdmins();
            let userObj1 = {
                username: 'admin',
                password: 'pass',
                firstname: 'John',
                lastname: 'Doe',
                phone: '2233445',
                address: '12 ABC Street',
                email: 'admin@test.com',
                admin_role: 'on'
            };

            let user1 = await userRepository.registerUser(userObj1).then(function (user) {
                return user;

            });

            let AdminCountAfter = await userRepository.countAdmins();
            assert.equal(AdminCountBefore, 0);
            assert.equal(AdminCountAfter, 1);

        });

        it("2. The function registerUser() should register Manager Users", async function () {
            let ManagerCountBefore = await userRepository.countManagers();
            let userObj2 = {
                username: 'aa',
                password: 'aa',
                firstname: 'aa',
                lastname: 'aa',
                phone: 'cc',
                address: 'A',
                email: 'aa@gmail.com',
                manager_role: 'on'
            };

            let user2 = await userRepository.registerUser(userObj2).then(function (user) {
                return user;
            });
            let ManagerCountAfter = await userRepository.countManagers();
            assert.equal(ManagerCountBefore, 0);
            assert.equal(ManagerCountAfter, 1);
        });

        it("3. The function registerUser() should register Trainer Users", async function () {

            let TrainerCountBefore = await userRepository.countTrainers();

            let userObj1 = {
                username: 'allaa',
                password: 'aa',
                firstname: 'Allaa',
                lastname: 'Al-Khalaf',
                phone: '2233445',
                address: '12 ABC Street',
                email: 'allaa@gmail.com',
                trainer_role: 'on'
            };

            let user1 = await userRepository.registerUser(userObj1).then(function (user) {
                return user;

            });

            let userObj2 = {
                username: 'fatma',
                password: 'aa',
                firstname: 'Fatma',
                lastname: 'Al-Atom',
                phone: '2233445',
                address: '12 ABC Street',
                email: 'fatma@gmail.com',
                trainer_role: 'on'
            };

            let user2 = await userRepository.registerUser(userObj2).then(function (user) {
                return user;
            });

            let TrainerCountAfter = await userRepository.countTrainers();
            assert.equal(TrainerCountBefore, 0);
            assert.equal(TrainerCountAfter, 2);
        });

        it("4. The function registerUser() should register Trainee Users", async function () {

            let TraineeCountBefore = await userRepository.countTrainees();

            let userObj1 = {
                username: 'adel',
                password: 'aa',
                firstname: 'Adel',
                lastname: 'Al-Khalaf',
                phone: '2233445',
                address: '12 ABC Street',
                email: 'adel@gmail.com',
                trainee_role: 'on'
            };

            let user1 = await userRepository.registerUser(userObj1).then(function (user) {
                return user;

            });

            let userObj2 = {
                username: 'safa',
                password: 'aa',
                firstname: 'Safa',
                lastname: 'Ibrahim',
                phone: '2233445',
                address: '12 ABC Street',
                email: 'safa@gmail.com',
                trainee_role: 'on'
            };

            let user2 = await userRepository.registerUser(userObj2).then(function (user) {
                return user;
            });

            let TraineeCountAfter = await userRepository.countTrainees();
            assert.equal(TraineeCountBefore, 0);
            assert.equal(TraineeCountAfter, 2);

        });

        it("5. The function countTrainees() should return the correct number of Trainee Users", async function () {
            let value = await userRepository.countTrainees();
            assert.equal(value, 2);
        });

        it("6. The function countTrainers() should return the correct number of Trainer Users", async function () {
            let value = await userRepository.countTrainers();
            assert.equal(value, 2);
        });

        it("7. The function countManagers() should return the correct number of Manager Users", async function () {
            let value = await userRepository.countManagers();
            assert.equal(value, 1);
        });
        it("8. The function countAdmins() should return the correct number of Admin Users", async function () {
            let value = await userRepository.countAdmins();
            assert.equal(value, 1);
        });
        it("9. The function getAllTraineeUsers() should return all Trainee Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllTraineeUsers();

            (JSON.stringify(value)).should.eql(JSON.stringify([{
                username: 'adel',
                first_name: 'Adel',
                last_name: 'Al-Khalaf',
                email: 'adel@gmail.com'
            }, {
                username: 'safa',
                first_name: 'Safa',
                last_name: 'Ibrahim',
                email: 'safa@gmail.com'
            }]));

        });
        it("10. The function getAllTrainerUsers() should return all Trainer Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllTrainerUsers();

            (JSON.stringify(value)).should.eql(JSON.stringify([{
                    username: 'allaa',
                    first_name: 'Allaa',
                    last_name: 'Al-Khalaf',
                    email: 'allaa@gmail.com'
                },
                    {
                        username: 'fatma', first_name: 'Fatma', last_name: 'Al-Atom', email: 'fatma@gmail.com'
                    }]
            ));

        });
        it("11. The function getAllManagerUsers() should return all Manager Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllManagerUsers();

            (JSON.stringify(value)).should.eql(JSON.stringify([{
                username: 'aa',
                first_name: 'Aa',
                last_name: 'Aa',
                email: 'aa@gmail.com'
            }]));

        });
        it("12. The function getAllAdminUsers() should return all Admin Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllAdminUsers();
            let expected = [{username: 'admin', first_name: 'John', last_name: 'Doe', email: 'admin@test.com'}];
            (JSON.stringify(value)).should.eql(JSON.stringify(expected));
        });

        it("13. The function login() should return a user object corresponding to the username and password", async function () {
            let value1 = await userRepository.login("admin", "pass");

            let expected = {
                username: 'admin',
                first_name: 'John',
                last_name: 'Doe',
                address: "12 ABC Street",
                phone: "2233445",
                email: 'admin@test.com',
                manager_role: 0,
                trainer_role: 0,
                trainee_role: 0,
                admin_role: 1,
                admin_id: 1,
                full_name: "John Doe"
            };
            (JSON.stringify(value1)).should.eql(JSON.stringify(expected));


            let value2 = await userRepository.login("adel", "aa");

            let expected2 = {
                username: 'adel',
                first_name: 'Adel',
                last_name: 'Al-Khalaf',
                address: "12 ABC Street",
                phone: "2233445",
                email: 'adel@gmail.com',
                manager_role: 0,
                trainer_role: 0,
                trainee_role: 1,
                admin_role: 0,
                trainee_id: 1,
                full_name: "Adel Al-Khalaf"
            };
            (JSON.stringify(value2)).should.eql(JSON.stringify(expected2));
        });

        it("14. The function findFirstAdmin() should return the first Admin User who is the first User in the DB", async function () {
            let value = await userRepository.findFirstAdmin(); //returns SequelizeInstance

            //get all the fields except the createdAt and updatedAt, they don't matter in this case
            let specficValue = {
                admin_id: value.admin_id,
                user_id: value.user_id,
            };

            (JSON.stringify(specficValue)).should.eql(JSON.stringify({admin_id: 1, user_id: 1}));
        });

        it("15. The function getAllTraineesForSchedule() should return all Trainee Users (only trainee_id, first and last names)", async function () {
            let value = await userRepository.getAllTraineesForSchedule();

            let expectedValue = [{
                trainee_id: 1,
                first_name: 'Adel',
                last_name: 'Al-Khalaf'
            }, {trainee_id: 2, first_name: 'Safa', last_name: 'Ibrahim'}];

            (JSON.stringify(value)).should.eql(JSON.stringify(expectedValue));
        });
        it("16. The function getAllTrainersForSchedule() should return all Trainer Users (only trainer_id, first and last names)", async function () {
            let value = await userRepository.getAllTrainersForSchedule();

            let expectedValue = [{trainer_id: 1, first_name: 'Allaa', last_name: 'Al-Khalaf'},
                {trainer_id: 2, first_name: 'Fatma', last_name: 'Al-Atom'}];

            (JSON.stringify(value)).should.eql(JSON.stringify(expectedValue));
        });
    });


    ////////////////////////////////COURSE
    describe('[Course Repository]', function () {
        it("1. The function addCourse() should successfully add a course [two courses]", async function () {
            let courseObj1 = {
                course_name: 'FireFighter I',
                year: 2019,
                semester: 'Fall'
            };
            let value1 = await courseRepository.addCourse(courseObj1);

            let expectedValue = {
                course_name: value1.course_name,
                year: value1.year,
                semester: value1.semester
            };

            (JSON.stringify(expectedValue)).should.eql(JSON.stringify(courseObj1));


            let courseObj2 = {
                course_name: 'FireFighter II',
                year: 2019,
                semester: 'Spring'
            };
            let value2 = await courseRepository.addCourse(courseObj2);
            let parsedValue2 = {
                course_name: value2.course_name,
                year: value2.year,
                semester: value2.semester
            };


            (JSON.stringify(parsedValue2)).should.eql(JSON.stringify(courseObj2));
        });

        it("2. The function getAllCourses() should successfully get all courses", async function () {
            let courses = await courseRepository.getAllCourses();

            courses.forEach(function (course) {
                delete course.createdAt;
                delete course.updatedAt;
            });

            let expectedValue = [{course_id: 1, course_name: 'FireFighter I', semester: 'Fall', year: 2019},
                {course_id: 2, course_name: 'FireFighter II', semester: 'Spring', year: 2019}];

            (JSON.stringify(courses)).should.eql(JSON.stringify(expectedValue));

        });

        it("3. The function addSkill() should successfully add three skills", async function () {
            let skill1 = {skill_name: 'FF-1', course_id: 1};
            let skill2 = {skill_name: 'FF-2', course_id: 1};
            let skill3 = {skill_name: 'FF-3', course_id: 1};

            let value1 = await courseRepository.addSkill(skill1);
            value1 = value1.toJSON();
            // skill1['skill_id'] = 1;
            delete value1.createdAt;
            delete value1.updatedAt;
            delete value1.skill_id;

            let value2 = await courseRepository.addSkill(skill2);
            value2 = value2.toJSON();
            //skill2['skill_id'] = 2;
            delete value2.createdAt;
            delete value2.updatedAt;
            delete value2.skill_id;

            let value3 = await courseRepository.addSkill(skill3);
            value3 = value3.toJSON();
            delete value3.createdAt;
            delete value3.updatedAt;
            delete value3.skill_id;
            //skill3['skill_id'] = 3;

            JSON.stringify(value1).should.eql(JSON.stringify(skill1));
            JSON.stringify(value2).should.eql(JSON.stringify(skill2));
            JSON.stringify(value3).should.eql(JSON.stringify(skill3));
        });

        it("4. The function addCriteria() should successfully add criteria to the 3 skills added just before", async function () {
            let criteria1 = {
                skill_id: 1,
                criteria1: 'Test Essential Criteria 1',
                criteria1Type: 'Essential',
                rangeValue: '1'
            };
            let criteria4 = {skill_id: 1, criteria1: 'Test Extra Criteria 1', criteria1Type: 'Extra', rangeValue: '1'};

            let array1 = await courseRepository.getCriteriaBasedOnCourseAndSkillIDs(1, 1);
            expect(array1.length).to.equal(0); //no criteria yet for course 1 and skill 1

            let value1 = await courseRepository.addCriteria(criteria1);
            let value4 = await courseRepository.addCriteria(criteria4);

            let array2 = await courseRepository.getCriteriaBasedOnCourseAndSkillIDs(1, 1);

            expect(array2.length).to.equal(2); //added 2 criteria

        });

        it("5. The function assignCourseTrainer() should successfully assign course 1 to trainer 1", async function () {
            let value = await courseRepository.assignCourseTrainer(1, 1);
            value = value.toJSON();
            delete value.createdAt;
            delete value.updatedAt;

            JSON.stringify(value).should.eql(JSON.stringify({course_id: 1, trainer_id: 1}));
        });

        it("6. The function assignCourseTrainee() should successfully assign course 1 to trainee 1", async function () {
            let value = await courseRepository.assignCourseTrainee(1, [1]);
            delete value.createdAt;
            delete value.updatedAt;

            expect(value.length).to.equal(1);
        });

        it("7. The function addUserSession() should successfully add a session for trainee 1", async function () {
            let criteriaJson = [{
                "criteria_id": 1,
                "criteria_name": "Test Essential Criteria 1",
                "criteria_score": -1,
                "criteria_type": "Essential"
            },
                {
                    "criteria_id": 2,
                    "criteria_name": "Test Extra Criteria 1",
                    "criteria_score": -2,
                    "criteria_type": "Essential"
                }];
            let value = await courseRepository.addUserSession(criteriaJson, 1, 1, 1, '0215', 'Training')
            delete value.createdAt;
            delete value.updatedAt;

            assert.equal(value, true);
        });

    });
    describe("[UserRepository]", function () {
        it("1. The function getTraineeUsersWhoHaveSessions() should return all the Trainees who have sessions (only first and last names, and trainee_id) for this specific Trainer", async function () {

            let user = {
                username: 'allaa',
                first_name: 'Allaa',
                last_name: 'Al-Khalaf',
                phone: '2233445',
                address: '12 ABC Street',
                email: 'allaa@gmail.com',
                manager_role: 0,
                trainer_role: 1,
                trainee_role: 0,
                admin_role: 0,
                trainer_id: 1,
                full_name: 'Allaa Al-Khalaf'
            };

            let value1 = await userRepository.getTraineeUsersWhoHaveSessions(user);

            JSON.stringify(value1).should.eql(JSON.stringify([{
                first_name: 'Adel',
                last_name: 'Al-Khalaf',
                trainee_id: 1
            }]));
        });

        it("2. The function getTraineeUsersWhoHaveSessions() should return all the Trainees who have sessions (only first and last names, and trainee_id)", async function () {

            let user = {
                username: 'aa',
                first_name: 'Aa',
                last_name: 'Aa',
                address: "A",
                phone: "cc",
                email: 'aa@gmail.com',
                manager_role: 1,
                trainer_role: 0,
                trainee_role: 0,
                admin_role: 0,
                manager_id: 1,
                full_name: "Aa Aa"
            };

            let value1 = await userRepository.getTraineeUsersWhoHaveSessions(user);

            JSON.stringify(value1).should.eql(JSON.stringify([{
                first_name: 'Adel',
                last_name: 'Al-Khalaf',
                trainee_id: 1
            }]));
        });

        it("3. The function getTrainersWhoHaveSessions() should return all the Trainers who have sessions (only first and last names, and trainer_id)", async function () {

            let value = await userRepository.getTrainersWhoHaveSessions();

            JSON.stringify(value).should.eql(JSON.stringify([{
                first_name: 'Allaa',
                last_name: 'Al-Khalaf',
                trainer_id: 1
            }]));
        });

    });

    after(async function () {
        await userRepository.closeDBConnection();
    })

});