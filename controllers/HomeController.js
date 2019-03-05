
class HomeController {
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
            req.session.user = user;
            return res.redirect('/')
        })
            .catch(e => {
                console.log(e)
                res.render('login', {title: 'Login', error: e})
            })
    }

    logout(req, res) {
        req.session.destroy(() => {
            return res.redirect('/')
        })
    }

    async manageCourses(req, res) {
        let coursesD = await this.courseRepository.getAllCourses(req.session.user);
        let courses = JSON.parse(JSON.stringify(coursesD));

        for (const course of courses) {
            const skills = await this.courseRepository.getSkillsBasedOnCourseID(req.session.user, course.course_id);
            course["countSkills"] = skills.length;
            if (skills.length > 0) {
                course["skills"] = JSON.parse(JSON.stringify(skills));
            }
        }


        res.render('manageCourses', {
            title: 'Manage Courses',
            courses: courses,
            success: req.session.success,
            error: req.session.error
        });
        delete req.session.success;
        delete req.session.error;
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
                console.log(e);
                res.render('registerUser', {title: 'Register User', error: e, prevUser: regUserObj})

            })
    }

    async getAllCourses(req, res) {
        let courses = await this.courseRepository.getAllCourses(req.session.user).catch(e => {
            res.send(e);
        });
        res.json(courses);
    }

    async getAllTrainers(req, res) {
        if (req.session.user) {
            if (req.session.user.manager_role === 1) {
                let trainers = await this.userRepository.getAllTrainersForSchedule().catch(e => {
                    res.send(e);
                });
                res.json(trainers);
            } else {
                res.send('Not Authorized to see trainer list')
            }
        } else {
            res.send('No User Logged In')
        }
    }

    async getAllTrainees(req, res) {
        if (req.session.user) {
            if (req.session.user.manager_role === 1) {
                let trainers = await this.userRepository.getAllTraineesForSchedule().catch(e => {
                    res.send(e);
                });
                res.json(trainers);
            } else {
                res.send('Not Authorized to see trainer list')
            }
        } else {
            res.send('No User Logged In')
        }
    }

    async AssignCourse(req, res) {
        let course_id = parseInt(req.body.schedule_courses);
        //let trainer_id = parseInt(req.body.trainers);
        let ctt_trainer_id = parseInt(req.body.ctt_trainer_id);

        console.log("---------------------------"+ctt_trainer_id);
        let selectedTraineesArray = req.body.selectedTraineesArray;
        let selectedTraineesIDs = selectedTraineesArray.split(',');

        let successCourseTrainer = await this.courseRepository.assignCourseTrainerTrainee(course_id, ctt_trainer_id,selectedTraineesIDs)
            .catch(e => {
                req.session.error = 'Error in assigning the course to the instructor and student(s)';
                res.redirect('/assign-schedule');
            });

        if (successCourseTrainer) {
            req.session.success = 'Successfully assigned the course to the instructor and student(s)!';
            res.redirect('/assign-schedule');
        }
    }

    async getAllCTT(req,res){
        let ctt = await this.courseRepository.getAllCTT(req.session.user).catch(e => {
            res.send(e);
        });
        res.json(ctt);
    }

    // async AssignCourseTrainee(req, res) {
    //     let selectedTraineesArray = req.body.selectedTraineesArray;
    //     let course_id = parseInt(req.body.schedule_trainee_courses);
    //
    //     let selectedTraineesIDs = selectedTraineesArray.split(',');
    //     console.log(selectedTraineesIDs);
    //
    //     let successCourseTrainee = await this.courseRepository.assignCourseTrainee(course_id, selectedTraineesIDs)
    //         .catch(e => {
    //             req.session.error = 'Error in assigning the student(s) to the course';
    //             res.redirect('/assign-schedule');
    //         });
    //
    //     if (successCourseTrainee) {
    //         req.session.success = 'Successfully assigned the student(s) to the course!';
    //         res.redirect('/assign-schedule');
    //     }
    // }

    async addCourse(req, res) {

        let courseObj = {
            course_name: req.body.course_name,
            semester: req.body.semester,
            year: req.body.year
        };


        let successCourse = await this.courseRepository.addCourse(courseObj)
            .catch(e => {
                req.session.error = 'Error in adding the course';
                res.redirect('/courses');
            });

        if (successCourse) {
            req.session.success = 'Successfully added the course!';
            res.redirect('/courses');
        }
        //res.render('manageCourses', {title: 'Manage Courses', courses:courses,success: 'Successfully added the course!'})

    }

    async addSkill(req, res) {
        let skillObj = {
            course_id: parseInt(req.body.courses),
            skill_name: req.body.skillname
        };

        let skill = await this.courseRepository.addSkill(skillObj)
            .catch(e => {
                req.session.error = 'Error in adding the skill';
                res.redirect('/courses');

            });

        if (skill) {
            req.session.success = 'Successfully added the skill!';
            res.redirect('/courses');
        }


    }

    async addCriteria(req, res) {
        let rangeValue = req.body.criteriaAmountRange;

        let criteriaObj = {
            course_id: parseInt(req.body.criteria_courses),
            skill_id: parseInt(req.body.criteria_skills),
            criteria1: req.body.criteria1,
            rangeValue: rangeValue
        };

        switch (rangeValue) {
            case '2': {
                criteriaObj['criteria2'] = req.body.criteria2;
                break;
            }
            case '3': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                break;
            }
            case '4': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                break;
            }
            case '5': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                criteriaObj['criteria5'] = req.body.criteria5;
                break;
            }
            case '6': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                criteriaObj['criteria5'] = req.body.criteria5;
                criteriaObj['criteria6'] = req.body.criteria6;
                break;
            }
            case '7': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                criteriaObj['criteria5'] = req.body.criteria5;
                criteriaObj['criteria6'] = req.body.criteria6;
                criteriaObj['criteria7'] = req.body.criteria7;
                break;
            }
            case '8': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                criteriaObj['criteria5'] = req.body.criteria5;
                criteriaObj['criteria6'] = req.body.criteria6;
                criteriaObj['criteria7'] = req.body.criteria7;
                criteriaObj['criteria8'] = req.body.criteria8;
                break;
            }
            case '9': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                criteriaObj['criteria5'] = req.body.criteria5;
                criteriaObj['criteria6'] = req.body.criteria6;
                criteriaObj['criteria7'] = req.body.criteria7;
                criteriaObj['criteria8'] = req.body.criteria8;
                criteriaObj['criteria9'] = req.body.criteria9;
                break;
            }
            case '10': {
                criteriaObj['criteria2'] = req.body.criteria2;
                criteriaObj['criteria3'] = req.body.criteria3;
                criteriaObj['criteria4'] = req.body.criteria4;
                criteriaObj['criteria5'] = req.body.criteria5;
                criteriaObj['criteria6'] = req.body.criteria6;
                criteriaObj['criteria7'] = req.body.criteria7;
                criteriaObj['criteria8'] = req.body.criteria8;
                criteriaObj['criteria9'] = req.body.criteria9;
                criteriaObj['criteria10'] = req.body.criteria10;
                break;
            }


        }
        this.courseRepository.addCriteria(criteriaObj).then(criteria => {
            console.log(criteria);
            req.session.success = 'Successfully added the Criteria!';
            res.redirect('/courses');
        })
            .catch(e => {
                req.session.error = 'Error in adding the Criteria';
                res.redirect('/courses');

            });

    }

    async getSkillsBasedOnCourseID(req, res) {
        let course_id = req.params.course_id;

        let skills = await this.courseRepository.getSkillsBasedOnCourseID(req.session.user, course_id).catch(e => {
            res.send(e);
        });
        res.json(skills);
    }

    async assignSchedule(req, res) {

        const courses = await this.courseRepository.getCourseInfoAndTrainer(req.session.user);


        res.render('courseSchedule', {
            title: 'Assign Schedule',
            courses: courses,
            success: req.session.success,
            error: req.session.error
        });
        delete req.session.success;
        delete req.session.error;
    }

}

module.exports = new HomeController();