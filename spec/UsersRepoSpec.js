const app = require("../repositories/UserRepository");
// setup Jasmine
var Jasmine = require("jasmine");
var jasmine = new Jasmine();

// Register a Custom Reporter
const Reporter = require('jasmine-console-reporter');
jasmine.jasmine.getEnv().addReporter(new Reporter());

describe("UserRepository Methods Unit Tests", function () {
    it("The function should return the correct number of Trainee Users", async function () {
        let value = await app.countTrainees();
        expect(value).toBe(2);
    });

    it("The function should return the correct number of Trainer Users", async function () {
        let value = await app.countTrainers();
        expect(value).toBe(1);
    });

    it("The function should return the correct number of Manager Users", async function () {
        let value = await app.countManagers();
        expect(value).toBe(1);
    });
    it("The function should return the correct number of Trainee Users", async function () {
        let value = await app.countAdmins();
        expect(value).toBe(1);
    });
    it("The function should return all Trainee Users (usernames,first & last names, email)", async function () {
        let value = await app.getAllTraineeUsers();

        expect(value).toEqual([{
            username: 'safa',
            first_name: 'Safa',
            last_name: 'Aa',
            email: 'safa@gmail.com'
        }, {username: 'adel', first_name: 'Adel', last_name: 'Aa', email: 'aa3@gmail.com'}]);
    });
    it("The function should return all Trainer Users (usernames,first & last names, email)", async function () {
        let value = await app.getAllTrainerUsers();
        expect(value).toEqual([{username: 'allaa', first_name: 'Allaa', last_name: 'Aa', email: 'cc1@gmail.com'}]);
    });
    it("The function should return all Manager Users (usernames,first & last names, email)", async function () {
        let value = await app.getAllManagerUsers();
        expect(value).toEqual([{username: 'aa', first_name: 'Aa', last_name: 'Aa', email: 'aa@gmail.com'}]);
    });
    it("The function should return all Admin Users (usernames,first & last names, email)", async function () {
        let value = await app.getAllAdminUsers();
        expect(value).toEqual([{username: 'admin', first_name: 'John', last_name: 'Doe', email: 'admin@test.com'}]);
    });
    it("The function should return a user object corresponding to the username and password", async function () {
        let value1 = await app.login("admin", "pass");
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

        let value2 = await app.login("adel", "aa");
        expect(value2).toEqual({
            username: 'adel',
            first_name: 'Adel',
            last_name: 'Aa',
            address: "22",
            phone: "22",
            email: 'aa3@gmail.com',
            manager_role: 0,
            trainer_role: 0,
            trainee_role: 1,
            admin_role: 0,
            trainee_id: 2,
            full_name: "Adel Aa"
        });
    });

    it("The function should return the first Admin User who is the first User in the DB", async function () {
        let value = await app.findFirstAdmin(); //returns SequelizeInstance

        //get all the fields except the createdAt and updatedAt, they don't matter in this case
        let specficValue = {
            admin_id: value.admin_id,
            user_id: value.user_id,
        }
        expect(specficValue).toEqual({admin_id: 1, user_id: 1});
    });
    it("The function should return all Trainee Users (only trainee_id, first and last names)", async function () {
        let value = await app.getAllTraineesForSchedule();
        expect(value).toEqual([{trainee_id: 1, first_name: 'Safa', last_name: 'Aa'}, {
            trainee_id: 2,
            first_name: 'Adel',
            last_name: 'Aa'
        }]);
    });
    it("The function should return all Trainer Users (only trainer_id, first and last names)", async function () {
        let value = await app.getAllTrainersForSchedule();
        expect(value).toEqual([{trainer_id: 1, first_name: 'Allaa', last_name: 'Aa'}]);
    });

    it("The function should return all the Trainees who have sessions (only first and last names, and trainee_id) for this specific Trainer", async function () {

        let user = {
            username: 'allaa',
            first_name: 'Allaa',
            last_name: 'Aa',
            address: "aa",
            phone: "33",
            email: 'cc1@gmail.com',
            manager_role: 0,
            trainer_role: 1,
            trainee_role: 0,
            admin_role: 0,
            trainer_id: 1,
            full_name: "Allaa Aa"
        };

        let value1 = await app.getTraineeUsersWhoHaveSessions(user);
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

        let value1 = await app.getTraineeUsersWhoHaveSessions(user);
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

        let value = await app.getTrainersWhoHaveSessions();
        expect(value).toEqual([{
            first_name: 'Allaa',
            last_name: 'Aa',
            trainer_id: 1
        }]);
    });


});
jasmine.execute();