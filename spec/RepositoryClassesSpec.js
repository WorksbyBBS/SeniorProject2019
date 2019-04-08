const userRepository = require("../repositories/UserRepository");
const courseRepository = require("../repositories/CourseRepository");
// setup Jasmine
const Jasmine = require("jasmine");
const jasmine = new Jasmine();


jasmine.loadConfigFile('spec/support/jasmine.json');

// Register a Custom Reporter
const Reporter = require('jasmine-console-reporter');
jasmine.jasmine.getEnv().addReporter(new Reporter());

describe("Repository Methods Unit Tests", function () {
    beforeAll(async function () {
        await userRepository.createTestDatabase().then(async function () {
        });
    });

    describe("[UserRepository]", function () {
        it("The function should register Admin Users", async function () {
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


        });

        it("The function should register Manager Users", async function () {

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

        });

        it("The function should register Trainer Users", async function () {
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

        });

        it("The function should register Trainee Users", async function () {
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

        });

        it("The function should return the correct number of Trainee Users", async function () {
            let value = await userRepository.countTrainees();
            expect(value).toBe(2);
        });

        it("The function should return the correct number of Trainer Users", async function () {
            let value = await userRepository.countTrainers();
            expect(value).toBe(2);
        });

        it("The function should return the correct number of Manager Users", async function () {
            let value = await userRepository.countManagers();
            expect(value).toBe(1);
        });
        it("The function should return the correct number of Admin Users", async function () {
            let value = await userRepository.countAdmins();
            expect(value).toBe(1);
        });
        it("The function should return all Trainee Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllTraineeUsers();

            expect(value).toEqual([{
                username: 'adel',
                first_name: 'Adel',
                last_name: 'Al-Khalaf',
                email: 'adel@gmail.com'
            }, {
                username: 'safa',
                first_name: 'Safa',
                last_name: 'Ibrahim',
                email: 'safa@gmail.com'
            }]);
        });
        it("The function should return all Trainer Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllTrainerUsers();
            expect(value).toEqual([{
                username: 'allaa',
                first_name: 'Allaa',
                last_name: 'Al-Khalaf',
                email: 'allaa@gmail.com'
            },
                {
                    username: 'fatma', first_name: 'Fatma', last_name: 'Al-Atom', email: 'fatma@gmail.com'
                }]);
        });
        it("The function should return all Manager Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllManagerUsers();
            expect(value).toEqual([{username: 'aa', first_name: 'Aa', last_name: 'Aa', email: 'aa@gmail.com'}]);
        });
        it("The function should return all Admin Users (usernames,first & last names, email)", async function () {
            let value = await userRepository.getAllAdminUsers();
            expect(value).toEqual([{username: 'admin', first_name: 'John', last_name: 'Doe', email: 'admin@test.com'}]);
        });
        it("The function should return a user object corresponding to the username and password", async function () {
            let value1 = await userRepository.login("admin", "pass");
            expect(value1).toEqual({
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
            });

            let value2 = await userRepository.login("adel", "aa");
            expect(value2).toEqual({
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
            });
        });

        it("The function should return the first Admin User who is the first User in the DB", async function () {
            let value = await userRepository.findFirstAdmin(); //returns SequelizeInstance

            //get all the fields except the createdAt and updatedAt, they don't matter in this case
            let specficValue = {
                admin_id: value.admin_id,
                user_id: value.user_id,
            }
            expect(specficValue).toEqual({admin_id: 1, user_id: 1});
        });
        it("The function should return all Trainee Users (only trainee_id, first and last names)", async function () {
            let value = await userRepository.getAllTraineesForSchedule();
            expect(value).toEqual([{
                trainee_id: 1,
                first_name: 'Adel',
                last_name: 'Al-Khalaf'
            }, {trainee_id: 2, first_name: 'Safa', last_name: 'Ibrahim'}]);
        });
        it("The function should return all Trainer Users (only trainer_id, first and last names)", async function () {
            let value = await userRepository.getAllTrainersForSchedule();
            expect(value).toEqual([{trainer_id: 1, first_name: 'Allaa', last_name: 'Al-Khalaf'},
                {trainer_id: 2, first_name: 'Fatma', last_name: 'Al-Atom'}]);
        });
    });


    ////////////////////////////////COURSE
    describe('[Course Repository]', function () {
        it("The function should successfully add a course [two courses])", async function () {
            let courseObj1 = {
                course_name: 'FireFighter I',
                year: 2019,
                semester: 'Fall'
            };
            let value1 = await courseRepository.addCourse(courseObj1);

            let parsedValue1 = {
                course_name: value1.course_name,
                semester: value1.semester,
                year: value1.year
            };

            expect(parsedValue1).toEqual(courseObj1);

            let courseObj2 = {
                course_name: 'FireFighter II',
                year: 2019,
                semester: 'Spring'
            };
            let value2 = await courseRepository.addCourse(courseObj2);
            let parsedValue2 = {
                course_name: value2.course_name,
                semester: value2.semester,
                year: value2.year
            };
            expect(parsedValue2).toEqual(courseObj2);
        });

        it("The function should successfully get all courses)", async function () {
            let courses = await courseRepository.getAllCourses();

            courses.forEach(function (course) {
                delete course.createdAt;
                delete course.updatedAt;
            });

            expect(courses).toEqual([{course_id: 1, course_name: 'FireFighter I', semester: 'Fall', year: 2019},
                {course_id: 2, course_name: 'FireFighter II', semester: 'Spring', year: 2019}])
        });

    });
    describe("[UserRepository]", function () {
        it("The function should return all the Trainees who have sessions (only first and last names, and trainee_id) for this specific Trainer", async function () {

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
            expect(value1).toEqual([{
                first_name: 'Safa',
                last_name: 'Aa',
                trainee_id: 1
            },
                {
                    first_name: 'Adel',
                    last_name: 'Aa',
                    trainee_id: 2
                }]);
        });

        it("The function should return all the Trainees who have sessions (only first and last names, and trainee_id)", async function () {

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
            expect(value1).toEqual([{
                first_name: 'Safa',
                last_name: 'Aa',
                trainee_id: 1
            },
                {
                    first_name: 'Adel',
                    last_name: 'Aa',
                    trainee_id: 2
                }]);
        });

        it("The function should return all the Trainers who have sessions (only first and last names, and trainer_id)", async function () {

            let value = await userRepository.getTrainersWhoHaveSessions();
            expect(value).toEqual([{
                first_name: 'Allaa',
                last_name: 'Aa',
                trainer_id: 1
            }]);
        });

    });


});
jasmine.execute();