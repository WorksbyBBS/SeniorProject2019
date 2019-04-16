class UserController {
    constructor() {
        this.userRepository = require('../models/UserRepository');
        this.courseRepository = require('../models/CourseRepository');
    }

    async createAdminUser(req, res) {
        this.userRepository.createAdminUserOnDBInit();
        if (res) {
            res.status(200).send('done')
        }
    }

    async adminDashboard(req, res) {
        let adminsCount = await this.userRepository.countAdmins();
        let managersCount = await this.userRepository.countManagers();
        let traineesCount = await this.userRepository.countTrainees();
        let trainersCount = await this.userRepository.countTrainers();
        let adminUsers = await this.userRepository.getAllAdminUsers();
        let managerUsers = await this.userRepository.getAllManagerUsers();
        let trainerUsers = await this.userRepository.getAllTrainerUsers();
        let traineeUsers = await this.userRepository.getAllTraineeUsers();

        res.render('admin', {
            title: 'Admin Dashboard',
            adminsCount: adminsCount,
            managersCount: managersCount,
            traineesCount: traineesCount,
            trainersCount: trainersCount,
            admins: adminUsers,
            managers: managerUsers,
            trainers: trainerUsers,
            trainees: traineeUsers
        });
    }

    async login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        this.userRepository.login(username, password).then(user => {
            //console.log("---\n---");
            //console.log(user);
            req.session.user = user;
            // //console.log(req.session.user);
            return res.redirect('/')
        })
            .catch(e => {
                ////console.log(e)
                res.render('login', {title: 'Login', error: e})
            })
    }

    logout(req, res) {
        req.session.destroy(() => {
            return res.redirect('/')
        })
    }

    async TrainerReport(req, res) {
        ////console.log(req.session.user);

        let courses = await this.courseRepository.getCoursesWhichHaveSessions(req.session.user);
        //console.log(courses);

        let trainees = await this.userRepository.getTraineeUsersWhoHaveSessions(req.session.user);
        //console.log(trainees);
        let trainers = await this.userRepository.getTrainersWhoHaveSessions();
        //console.log(trainers);


        res.render('trainerReport', {
            title: 'Student Sessions Report',
            courses: courses,
            trainees: trainees,
            trainers: trainers,
            trainer_role: req.session.user.trainer_role
        });
    }

    async registerUser(req, res) {
        let regUserObj = {
            firstname: req.body.first_name,
            lastname: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            admin_role: req.body.admin_role,
            manager_role: req.body.manager_role,
            trainer_role: req.body.trainer_role,
            trainee_role: req.body.trainee_role
        };


        this.userRepository.registerUser(regUserObj).then(user => {
            res.render('registerUser', {title: 'Register User', success: 'Successfully Registered New User'})
        })
            .catch(e => {
                //console.log(e);
                res.render('registerUser', {title: 'Register User', error: e, prevUser: regUserObj})

            })
    }


    async getAllTrainers(req, res) {
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.admin_role === 1) {
                let trainers = await this.userRepository.getAllTrainersForSchedule().catch(e => {
                    res.send(e);
                });
                res.json(trainers);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see the list of trainers',
                    layout: 'errorLayout.hbs'
                });
            }
        } else {
            res.render('error', {
                errorCode: '404',
                error: "Not Found",
                extraMessage: 'No user logged in',
                layout: 'errorLayout.hbs'
            });
        }
    }

    async getAllTrainees(req, res) {
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.admin_role === 1) {
                let trainers = await this.userRepository.getAllTraineesForSchedule().catch(e => {
                    res.send(e);
                });
                res.json(trainers);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see the list of trainees',
                    layout: 'errorLayout.hbs'
                });
            }
        } else {
            res.render('error', {
                errorCode: '404',
                error: "Not Found",
                extraMessage: 'No user logged in',
                layout: 'errorLayout.hbs'
            });
        }
    }


}

module.exports = new UserController();