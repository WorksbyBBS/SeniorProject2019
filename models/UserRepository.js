const db = require('../config/db.config.js');
const Users = db.users;
const Admins = db.admins;
const Managers = db.managers;
const Trainers = db.trainers;
const Trainees = db.trainees;
const Roles = db.roles;
const bcrypt = require('bcrypt');
const mysql2 = require('mysql2');

class UserRepository {

    async connectAndCreateToDB() {

        console.log(process.env.APP_ENV);
        let db_name = '';
        let syncOption = false;
        if ((process.env.APP_ENV == 'utest') || (process.env.APP_ENV == 'itest')) {
            db_name = 'sp2019_test_db';
        } else {
            db_name = 'sp2019_db';
        }

        if (process.env.APP_ENV === 'utest') {
            syncOption = true;
        } else {
            syncOption = false;
        }


        let thisInstance = this;
        const connection = mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'CSE_SP_2019'
        });

        connection.query('CREATE DATABASE IF NOT EXISTS ??', db_name, function (err) {
            if (err) {
                console.log('error in creating ' + db_name + ' database');
                return;
            }
            console.log('created a new database ' + db_name);

            connection.changeUser({
                database: db_name
            }, function (err) {
                if (err) {
                    console.log('error in changing database', err);
                    return;
                }
                connection.end();
                console.log('connection terminated successfully');
                // });
            });
        });

        db.sequelize.authenticate().then(() => {
            console.log('Sequelize Connection has been established successfully to the DB ' + db_name);
        })
            .catch(err => {
                console.error('Sequelize Unable to connect to the DB:', err);
            });


        await db.sequelize.sync({
            force: syncOption
        }).then(function () {
            if (db_name === 'sp2019_db')
                thisInstance.createAdminUserOnDBInit();
        });
    }

    async closeDBConnection() {
        await db.sequelize.close();
    }

    async dropTestDB() {
        await db.sequelize.dropSchema('sp2019_test_db', {});
    }

    async createAdminUserOnDBInit() {

        //check if this first admin is in the DB
        let result = this.findFirstAdmin().then(function (admin) {

            if (admin != null) {
                return 0;
            } else {
                let userObj = {
                    username: 'admin',
                    password: 'pass',
                    first_name: 'John',
                    last_name: 'Doe',
                    phone: '2233445',
                    address: '12 ABC Street',
                    email: 'admin@test.com'
                };

                return bcrypt.hash(userObj.password, 10, function (err, hash) {
                    //console.log(hash + "------");
                    userObj.password = hash;
                    return Users.create(userObj).then(function (adminUser) {
                        Admins.create({user_id: adminUser.user_id});
                        Roles.create({
                            user_id: adminUser.user_id,
                            admin_role: 1,
                            trainer_role: 0,
                            manager_role: 0,
                            trainee_role: 0
                        });
                    })
                });
            }
        });
    }

    async findFirstAdmin() {
        return Admins.findOne({
            where: {
                user_id: 1
            }
        });
    }


    async countTrainers() {
        return Trainers.count();
    }

    async countAdmins() {
        return Admins.count();
    }

    async countTrainees() {
        return Trainees.count();
    }

    async countManagers() {
        return Managers.count();
    }

    async login(username, password) {


        const correctPassword = (enteredPassword, originalPassword) => {
            return new Promise(resolve => {
                bcrypt.compare(enteredPassword, originalPassword, (err, res) => {
                    resolve(res)
                });
            })
        };


        //let user = await Users.findOne({where: {username: username, password: password}});
        let user = await Users.findOne({where: {username: username}});
        //console.log(user);
        if (user) {

            let newUserObj = {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                phone: user.phone,
                email: user.email,
                manager_role: 0,
                trainer_role: 0,
                trainee_role: 0,
                admin_role: 0
            };

            const authenticated = await correctPassword(password, user.password);

            //console.log("------------" + authenticated);

            if (authenticated) {
                let foundRole = await Roles.findOne({where: {user_id: user.user_id}});

                if (foundRole.manager_role) {
                    await Managers.findOne({where: {user_id: user.user_id}}).then(manager => {
                        newUserObj['manager_id'] = manager.manager_id;
                    });
                    newUserObj.manager_role = 1;
                }

                if (foundRole.trainer_role) {
                    await Trainers.findOne({where: {user_id: user.user_id}}).then(trainer => {
                        newUserObj['trainer_id'] = trainer.trainer_id;
                    });
                    newUserObj.trainer_role = 1;
                }

                if (foundRole.trainee_role) {
                    await Trainees.findOne({where: {user_id: user.user_id}}).then(trainee => {
                        newUserObj['trainee_id'] = trainee.trainee_id;
                    });
                    newUserObj.trainee_role = 1;
                }
                if (foundRole.admin_role) {
                    await Admins.findOne({where: {user_id: user.user_id}}).then(admin => {
                        newUserObj['admin_id'] = admin.admin_id;
                    });
                    newUserObj.admin_role = 1;
                }

                newUserObj['full_name'] = newUserObj.first_name + " " + newUserObj.last_name;
                // //console.log(newUserObj);
                return newUserObj;
            } else {
                throw 'Username and/or password invalid'
            }

        } else {
            throw 'Username and/or password invalid'
        }
    }

    async loginUnity(username, password) {

        const correctPassword = (enteredPassword, originalPassword) => {
            return new Promise(resolve => {
                bcrypt.compare(enteredPassword, originalPassword, (err, res) => {
                    resolve(res)
                });
            })
        };

        //let user = await Users.findOne({where: {username: username, password: password}});
        let user = await Users.findOne({where: {username: username}});
        //console.log(user);
        if (user) {

            let newUserObj = {
                user_id: user.user_id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            };

            const authenticated = await correctPassword(password, user.password);

            //console.log("------------" + authenticated);

            if (authenticated) {
                let trainee = await Trainees.findOne({where: {user_id: user.user_id}});

                if (trainee) {
                    newUserObj['trainee_id'] = trainee.trainee_id;
                }
                newUserObj['full_name'] = newUserObj.first_name + " " + newUserObj.last_name;
                return newUserObj;
            } else {
                throw 'Username and/or password invalid'
            }


        } else {
            throw 'Username and/or password invalid'
        }

    }

    async registerUser(regUserObj) {

        //check username before adding user
        let userInDB = await Users.findOne({where: {username: regUserObj.username}});
        if (userInDB) {
            throw "Username already in use. Please change it";
        }

        if ((typeof regUserObj.admin_role === 'undefined') && (typeof regUserObj.manager_role === 'undefined') && (typeof regUserObj.trainer_role === 'undefined') && (typeof regUserObj.trainee_role === 'undefined')) {
            throw "Please choose at least one role for this user"
        }

        //check email before adding
        let userInDBEmail = await Users.findOne({where: {email: regUserObj.email}});
        if (userInDBEmail) {
            throw "Email already in use. Please change it";
        }

        //since username and email are unique. Add the user.

        const hashedPassword = (enteredPassword) => {
            return new Promise(resolve => {
                bcrypt.hash(enteredPassword, 10, (err, hash) => {
                    resolve(hash);
                });
            });
        };

        const hashValue = await hashedPassword(regUserObj.password);

        // let hashedPassword = await bcrypt.hash(regUserObj.password, 10, function (err, hash) {
        //     regUserObj.password = hash;
        // });

        //console.log("-------!!!!---\n" + hashValue);

        let u = await Users.create({
            username: regUserObj.username,
            first_name: regUserObj.firstname.capitalizeFirstLetter(),
            last_name: regUserObj.lastname.capitalizeFirstLetter(),
            password: hashValue,
            email: regUserObj.email,
            address: regUserObj.address.capitalizeFirstLetter(),
            phone: regUserObj.phone
        })
            .then(function (newUser) {

                if (regUserObj.admin_role === 'on') {
                    Admins.create({user_id: newUser.user_id});
                    regUserObj.admin_role = 1;
                } else {
                    regUserObj.admin_role = 0;
                }
                if (regUserObj.manager_role === 'on') {
                    Managers.create({user_id: newUser.user_id});
                    regUserObj.manager_role = 1;
                } else {
                    regUserObj.manager_role = 0;
                }
                if (regUserObj.trainer_role === 'on') {
                    Trainers.create({user_id: newUser.user_id});
                    regUserObj.trainer_role = 1;
                } else {
                    regUserObj.trainer_role = 0;
                }
                if (regUserObj.trainee_role === 'on') {
                    Trainees.create({user_id: newUser.user_id});
                    regUserObj.trainee_role = 1;
                } else {
                    regUserObj.trainee_role = 0;
                }

                Roles.create({
                    user_id: newUser.user_id,
                    admin_role: regUserObj.admin_role,
                    trainer_role: regUserObj.trainer_role,
                    manager_role: regUserObj.manager_role,
                    trainee_role: regUserObj.trainee_role
                });
            });

        return u;
    }

    async getAllAdminUsers() {
        let query = 'select users.username,users.first_name,users.last_name,users.email from Users users\n' +
            'inner join Roles roles\n' +
            'on users.user_id = roles.user_id\n' +
            'where roles.admin_role=1;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(admins => {
            return admins;
        });
    }

    async getAllManagerUsers() {
        let query = 'select users.username,users.first_name,users.last_name,users.email from Users users\n' +
            'inner join Roles roles\n' +
            'on users.user_id = roles.user_id\n' +
            'where roles.manager_role=1;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(managers => {
            return managers;
        });
    }

    async getAllTrainerUsers() {
        let query = 'select users.username,users.first_name,users.last_name,users.email from Users users\n' +
            'inner join Roles roles\n' +
            'on users.user_id = roles.user_id\n' +
            'where roles.trainer_role=1;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(trainers => {
            return trainers;
        });
    }

    async getTrainersWhoHaveSessions() {
        let query = 'select distinct u.first_name, u.last_name, s.trainer_id \n' +
            'from Sessions s \n' +
            'inner join trainers t\n' +
            'on s.trainer_id = t.trainer_id\n' +
            'inner join Users u\n' +
            'on u.user_id=t.user_id;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(trainers => {
            return trainers;
        });
    }

    async getAllTrainersForSchedule() {
        let query = 'select trainer.trainer_id,users.first_name,users.last_name from Users users\n' +
            'inner join Trainers trainer\n' +
            'on users.user_id = trainer.user_id;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(trainers => {
            return trainers;
        });
    }

    async getAllTraineesForSchedule() {
        let query = 'select trainee.trainee_id, users.first_name,users.last_name from Users users\n' +
            'inner join Trainees trainee\n' +
            'on users.user_id = trainee.user_id;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(trainees => {
            return trainees;
        });
    }


    async getAllTraineeUsers() {
        let query = 'select users.username,users.first_name,users.last_name,users.email from Users users\n' +
            'inner join Roles roles\n' +
            'on users.user_id = roles.user_id\n' +
            'where roles.trainee_role=1;';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(trainee => {
            return trainee;
        });
    }

    async getTraineeUsersWhoHaveSessions(user) {
        let query = '';
        if (user.trainer_role === 1) {
            query = 'select distinct u.first_name,u.last_name,t.trainee_id\n' +
                'from Trainees as t\n' +
                'inner join Sessions as s\n' +
                'on s.trainee_id=t.trainee_id\n' +
                'inner join Users as u\n' +
                'on t.user_id=u.user_id where s.trainer_id=' + user.trainer_id + ';';
        } else if (user.manager_role === 1) {
            query = 'select distinct u.first_name,u.last_name,t.trainee_id\n' +
                'from Trainees as t\n' +
                'inner join Sessions as s\n' +
                'on s.trainee_id=t.trainee_id\n' +
                'inner join Users as u\n' +
                'on t.user_id=u.user_id;';
        }


        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(trainees => {
            return trainees;
        });
    }

}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = new UserRepository();