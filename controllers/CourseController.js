class CourseController {
    constructor() {
        this.courseRepository = require('../repositories/CourseRepository');
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

    async getSkillsBasedOnCourseIDInSession(req, res) {
        let courseid = req.params.course_id;
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.trainer_role === 1 || req.session.user.trainee_role === 1) {
                let skills = await this.courseRepository.getSkillsBasedOnCourseIDInSession(courseid).catch(e => {
                    res.send(e);
                });
                res.json(skills);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see the list of skills',
                    layout: 'errorLayout.hbs'
                });

                //res.send('Not Authorized to see trainer list')
            }
        } else {
            res.render('error', {
                errorCode: '404',
                error: "Not Found",
                extraMessage: 'No user logged in',
                layout: 'errorLayout.hbs'
            });

            //res.send('No User Logged In')
        }
    }

    async getSessionsBasedOnSkillId(req, res) {
        let skillid = req.params.skill_id;
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.trainer_role === 1 || req.session.user.trainee_role === 1) {
                let sessions = await this.courseRepository.getSessionsBasedOnSkillId(skillid, req.session.user.trainee_id).catch(e => {
                    res.send(e);
                });
                res.json(sessions);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see the list of sessions',
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

    async getSessionBasedOnFilters(req, res) {
        let courseId = req.params.course_id;
        let skillId = req.params.skill_id;
        let traineeId = req.params.trainee_id;
        let trainerId = req.params.trainer_id;

        console.log(courseId);
        console.log(skillId);
        console.log(traineeId);
        console.log(trainerId);

        if (req.session.user) {

            //meaning that a trainer accessed the link of courseId/skillId/sessionId
            if (typeof trainerId === 'undefined') {
                if (req.session.user.trainer_role === 1 || req.session.user.trainee_role === 1) {
                    let sessions = await this.courseRepository.getSessionBasedOnFilters(req.session.user.trainer_id, courseId, skillId, traineeId, trainerId).catch(e => {
                        res.send(e);
                    });
                    res.json(sessions);
                } else {
                    res.render('error', {
                        errorCode: '403',
                        error: "Forbidden Access",
                        extraMessage: 'Not authorized to see the list of sessions',
                        layout: 'errorLayout.hbs'
                    });
                }
            } else {
                //meaning that a manager accessed the link of courseId/skillId/sessionId
                if (req.session.user.manager_role === 1) {
                    let sessions = await this.courseRepository.getSessionBasedOnFilters(req.session.user.trainer_id, courseId, skillId, traineeId, trainerId).catch(e => {
                        res.send(e);
                    });
                    res.json(sessions);
                } else {
                    res.render('error', {
                        errorCode: '403',
                        error: "Forbidden Access",
                        extraMessage: 'Not authorized to see the list of sessions',
                        layout: 'errorLayout.hbs'
                    });
                }
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

    async getScoreBasedOnSessionId(req, res) {
        let sessionid = req.params.session_id;
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.trainer_role === 1 || req.session.user.trainee_role === 1) {
                let score = await this.courseRepository.getScoreBasedOnSessionId(sessionid).catch(e => {
                    res.send(e);
                });
                res.json(score);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see the list of scores',
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

    async getSessionBasedOnId(req, res) {
        let sessionid = req.params.session_id;
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.trainer_role === 1 || req.session.user.trainee_role === 1) {
                let score = await this.courseRepository.getSessionBasedOnId(sessionid).catch(e => {
                    res.send(e);
                });
                res.json(score);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see this session',
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

    async TraineeReport(req, res) {
        console.log(req.session.user);
        let courses = await this.courseRepository.getCoursesWhichHaveSessions(req.session.user);
        res.render('traineeReport', {title: 'Session Report', courses: courses});
    }

    async TrainerToTrainee(req, res) {

        let session_id = req.params.sessionIdForm;
        console.log(session_id);
        let usersession = await this.courseRepository.getSessionBasedOnId(session_id);
        console.log(usersession);
        if (usersession.length > 0) {
            let training_session_trainer_id = usersession[0].trainer_id
            console.log("------------" + training_session_trainer_id);
            let current_trainer_id = req.session.user.trainer_id;
            console.log("---++++---+--" + current_trainer_id);
            if (training_session_trainer_id === current_trainer_id || (req.session.user.manager_role === 1)) {

                let date = usersession[0].createdAt + '';
                let splitDate = date.split(/[- :]/);

                usersession[0]["sessionTime"] = splitDate[3] + ":" + splitDate[4] + ":" + splitDate[5];
                usersession[0]["sessionDate"] = splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2];
                let scores = await this.courseRepository.getScoreBasedOnSessionId(session_id);

                let essentialCriteriaScores = [];
                let extraCriteriaScores = [];
                for (let i = 0; i < scores.length; i++) {
                    if (scores[i].score_value === -1) {
                        scores[i].score_value = "Pass";
                        essentialCriteriaScores.push(scores[i]);
                    } else if (scores[i].score_value === -2) {
                        scores[i].score_value = "Fail"
                        essentialCriteriaScores.push(scores[i]);
                    } else {
                        extraCriteriaScores.push(scores[i]);
                    }
                }

                let finalScore = 'Pass';
                for (let i = 0; i < essentialCriteriaScores.length; i++) {
                    if (essentialCriteriaScores[i].score_value === 'Fail') {
                        finalScore = "Fail";
                        break;
                    }
                }

                console.log(usersession);
                res.render('traineeReport', {
                    title: 'Session Report',
                    usersession: usersession,
                    scores: essentialCriteriaScores,
                    extraCriteriaScores: extraCriteriaScores,
                    finalScore: finalScore
                });

            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see this session. You are not the instructor for this course',
                    layout: 'errorLayout.hbs'
                });
                //res.send("Not authorized to see this session. You are not the instructor");
            }
        } else {
            res.render('error', {
                errorCode: '404',
                error: "Session Not found",
                extraMessage: 'Please check the session ID again',
                layout: 'errorLayout.hbs'
            });
            // res.send("No session with this id has been found");
        }
    }

    async getAllCourses(req, res) {
        if (req.session.user) {
            if (req.session.user.manager_role === 1) {
                let courses = await this.courseRepository.getAllCourses().catch(e => {
                    res.send(e);
                });
                res.json(courses);
            } else {
                res.render('error', {
                    errorCode: '403',
                    error: "Forbidden Access",
                    extraMessage: 'Not authorized to see the list of courses',
                    layout: 'errorLayout.hbs'
                });

                //res.send('Not Authorized to see trainer list')
            }
        } else {
            res.render('error', {
                errorCode: '404',
                error: "Not Found",
                extraMessage: 'No user logged in',
                layout: 'errorLayout.hbs'
            });

            //res.send('No User Logged In')
        }
    }

    async AssignCourse(req, res) {
        let course_id = parseInt(req.body.schedule_courses);
        //let trainer_id = parseInt(req.body.trainers);
        let ctt_trainer_id = parseInt(req.body.ctt_trainer_id);

        console.log("---------------------------" + ctt_trainer_id);


        let successCourseTrainer = await this.courseRepository.assignCourseTrainer(course_id, ctt_trainer_id)
            .catch(e => {
                req.session.error = 'Error in assigning the course to the instructor';
                res.redirect('/assign-schedule');
            });

        if (successCourseTrainer) {
            req.session.success = 'Successfully assigned the course to the instructor!';
            res.redirect('/assign-schedule');
        }
    }

    async AddSessionComment(req, res) {
        let session_id = req.body.commentSessionId;
        console.log(session_id);
        let comment = req.body.sessionComment;
        console.log(comment);

        let response = await this.courseRepository.AddSessionComment(req.session.user, session_id, comment);
        res.send('success');
    }

    async AddScoreComment(req, res) {
        let score_id = req.body.commentScoreId;
        console.log(score_id);
        let comment = req.body.scoreComment;
        console.log(comment);

        let response = await this.courseRepository.AddScoreComment(req.session.user, score_id, comment);
        res.send('success');
    }

    async AssignCourseTrainee(req, res) {
        let course_id = parseInt(req.body.schedule_courses);

        let selectedTraineesArray = req.body.selectedTraineesArray;
        let selectedTraineesIDs = selectedTraineesArray.split(',');

        let successCourseTrainer = await this.courseRepository.assignCourseTrainee(course_id, selectedTraineesIDs)
            .catch(e => {
                req.session.error = 'Error in assigning the course to the student(s)';
                res.redirect('/assign-schedule');
            });

        if (successCourseTrainer) {
            req.session.success = 'Successfully assigned the course to the student(s)!';
            res.redirect('/assign-schedule');
        }
    }

    async getAllCTrainers(req, res) {
        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.admin_role === 1) {
                let ctt = await this.courseRepository.getAllCTrainers(req.session.user).catch(e => {
                    res.send(e);
                });
                res.json(ctt);
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

    async getAllCTrainees(req, res) {

        if (req.session.user) {
            if (req.session.user.manager_role === 1 || req.session.user.admin_role === 1) {
                let ctt = await this.courseRepository.getAllCTrainees(req.session.user).catch(e => {
                    res.send(e);
                });
                res.json(ctt);
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
            criteria1: (req.body.criteria1).trim(),
            criteria1Type: req.body.criteriaType1,
            rangeValue: rangeValue
        };

        //console.log(criteriaObj);

        switch (rangeValue) {
            case '2': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                break;
            }
            case '3': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                break;
            }
            case '4': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                break;
            }
            case '5': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                criteriaObj['criteria5'] = (req.body.criteria5).trim();
                criteriaObj['criteria5Type'] = req.body.criteriaType5;
                break;
            }
            case '6': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                criteriaObj['criteria5'] = (req.body.criteria5).trim();
                criteriaObj['criteria5Type'] = req.body.criteriaType5;
                criteriaObj['criteria6'] = (req.body.criteria6).trim();
                criteriaObj['criteria6Type'] = req.body.criteriaType6;
                break;
            }
            case '7': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                criteriaObj['criteria5'] = (req.body.criteria5).trim();
                criteriaObj['criteria5Type'] = req.body.criteriaType5;
                criteriaObj['criteria6'] = (req.body.criteria6).trim();
                criteriaObj['criteria6Type'] = req.body.criteriaType6;
                criteriaObj['criteria7'] = (req.body.criteria7).trim();
                criteriaObj['criteria7Type'] = req.body.criteriaType7;
                break;
            }
            case '8': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                criteriaObj['criteria5'] = (req.body.criteria5).trim();
                criteriaObj['criteria5Type'] = req.body.criteriaType5;
                criteriaObj['criteria6'] = (req.body.criteria6).trim();
                criteriaObj['criteria6Type'] = req.body.criteriaType6;
                criteriaObj['criteria7'] = (req.body.criteria7).trim();
                criteriaObj['criteria7Type'] = req.body.criteriaType7;
                criteriaObj['criteria8'] = (req.body.criteria8).trim();
                criteriaObj['criteria8Type'] = req.body.criteriaType8;
                break;
            }
            case '9': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                criteriaObj['criteria5'] = (req.body.criteria5).trim();
                criteriaObj['criteria5Type'] = req.body.criteriaType5;
                criteriaObj['criteria6'] = (req.body.criteria6).trim();
                criteriaObj['criteria6Type'] = req.body.criteriaType6;
                criteriaObj['criteria7'] = (req.body.criteria7).trim();
                criteriaObj['criteria7Type'] = req.body.criteriaType7;
                criteriaObj['criteria8'] = (req.body.criteria8).trim();
                criteriaObj['criteria8Type'] = req.body.criteriaType8;
                criteriaObj['criteria9'] = (req.body.criteria9).trim();
                criteriaObj['criteria9Type'] = req.body.criteriaType9;
                break;
            }
            case '10': {
                criteriaObj['criteria2'] = (req.body.criteria2).trim();
                criteriaObj['criteria2Type'] = req.body.criteriaType2;
                criteriaObj['criteria3'] = (req.body.criteria3).trim();
                criteriaObj['criteria3Type'] = req.body.criteriaType3;
                criteriaObj['criteria4'] = (req.body.criteria4).trim();
                criteriaObj['criteria4Type'] = req.body.criteriaType4;
                criteriaObj['criteria5'] = (req.body.criteria5).trim();
                criteriaObj['criteria5Type'] = req.body.criteriaType5;
                criteriaObj['criteria6'] = (req.body.criteria6).trim();
                criteriaObj['criteria6Type'] = req.body.criteriaType6;
                criteriaObj['criteria7'] = (req.body.criteria7).trim();
                criteriaObj['criteria7Type'] = req.body.criteriaType7;
                criteriaObj['criteria8'] = (req.body.criteria8).trim();
                criteriaObj['criteria8Type'] = req.body.criteriaType8;
                criteriaObj['criteria9'] = (req.body.criteria9).trim();
                criteriaObj['criteria9Type'] = req.body.criteriaType9;
                criteriaObj['criteria10'] = (req.body.criteria10).trim();
                criteriaObj['criteria10Type'] = req.body.criteriaType10;
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

module.exports = new CourseController();