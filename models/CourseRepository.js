const db = require('../config/db.config.js');
const Courses = db.courses;
const Skills = db.skills;
const Criteria = db.skill_criteria;
const Course_Trainee = db.course_trainee;
const Course_Trainer = db.course_trainer;
const Sessions = db.sessions;
const Scores = db.criteria_scores;

class CourseRepository {

    async getAllCourses() {
        //manager can see courses
        return await Courses.findAll({});

    }

    async getAllCTrainers() {
        //manager can see courses
        return await Course_Trainer.findAll({});

    }

    async getAllCTrainees() {
        return await Course_Trainee.findAll({});

    }

    async getSkillsBasedOnCourseID(user, id) {
        if (user) {
            if (user.manager_role === 1 || user.trainee_role === 1 || user.trainer_role === 1) {
                return await Skills.findAll({where: {course_id: id}});
            } else {
                throw "Not Authorized to Access Skills"
            }
        } else {
            throw "No User Logged In"
        }
    }

    async getCourseInfoAndTrainer(user) {

        if (user) {
            if (user.manager_role === 1 || user.trainee_role === 1 || user.trainer_role === 1) {
                let query = 'select distinct courses.course_id, courses.course_name, courses.year, courses.semester,ctrainer.trainer_id, users.first_name,users.last_name \n' +
                    'from sp2019_db.Users users\n' +
                    'inner join sp2019_db.Course_Trainers as ctrainer\n' +
                    'inner join sp2019_db.Trainers trainers\n' +
                    'inner join sp2019_db.Courses courses\n' +
                    'on courses.course_id=ctrainer.course_id\n' +
                    'and ctrainer.trainer_id = trainers.trainer_id\n' +
                    'and trainers.user_id = users.user_id;';

                return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(result => {
                    return result;
                });
            } else {
                throw "Not Authorized to Access This information"
            }
        } else {
            throw "No User Logged In"
        }

    }

    async addCourse(courseObj) {

        return await Courses.create({
            course_name: courseObj.course_name,
            semester: courseObj.semester,
            year: courseObj.year
        });
    }

    async assignCourseTrainer(course_id, trainer_id) {

        let ct = await Course_Trainer.create({
            course_id: course_id,
            trainer_id: trainer_id
        });
        return ct;
    }


    async assignCourseTrainee(course_id, selectedTraineesIDs) {
        let i = 0;
        let ctArray = [];
        for (i; i < selectedTraineesIDs.length; i++) {
            let ct = await Course_Trainee.create({
                course_id: course_id,
                trainee_id: selectedTraineesIDs[i]
            });
            ctArray.push(ct)
        }
        return ctArray;

    }

    async addSkill(skillObj) {
        return await Skills.create({
            skill_name: skillObj.skill_name,
            course_id: skillObj.course_id
        })
    }

    async addCriteria(criteriaObj) {

        switch (criteriaObj.rangeValue) {
            case '1': {

                return await Criteria.create({
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                });
            }
            case '2': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    }]);
            }
            case '3': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }]);
            }
            case '4': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    }]);
            }
            case '5': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5,
                        criteria_type: criteriaObj.criteria5Type
                    }]);
            }
            case '6': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5,
                        criteria_type: criteriaObj.criteria5Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6,
                        criteria_type: criteriaObj.criteria6Type
                    }]);
            }
            case '7': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5,
                        criteria_type: criteriaObj.criteria5Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6,
                        criteria_type: criteriaObj.criteria6Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7,
                        criteria_type: criteriaObj.criteria7Type
                    }]);
            }
            case '8': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5,
                        criteria_type: criteriaObj.criteria5Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6,
                        criteria_type: criteriaObj.criteria6Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7,
                        criteria_type: criteriaObj.criteria7Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria8,
                        criteria_type: criteriaObj.criteria8Type
                    }]);
            }
            case '9': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5,
                        criteria_type: criteriaObj.criteria5Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6,
                        criteria_type: criteriaObj.criteria6Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7,
                        criteria_type: criteriaObj.criteria7Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria8,
                        criteria_type: criteriaObj.criteria8Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria9,
                        criteria_type: criteriaObj.criteria9Type
                    }]);
            }
            case '10': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1,
                    criteria_type: criteriaObj.criteria1Type
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2,
                        criteria_type: criteriaObj.criteria2Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3,
                        criteria_type: criteriaObj.criteria3Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4,
                        criteria_type: criteriaObj.criteria4Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5,
                        criteria_type: criteriaObj.criteria5Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6,
                        criteria_type: criteriaObj.criteria6Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7,
                        criteria_type: criteriaObj.criteria7Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria8,
                        criteria_type: criteriaObj.criteria8Type
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria9,
                        criteria_type: criteriaObj.criteria9Type
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria10,
                        criteria_type: criteriaObj.criteria10Type
                    }]);
            }
        }
    }

    async getUserCourses(userId) {
        return await Course_Trainee.findAll({where: {trainee_id: userId}}).then(async courses => {
            let coursesInfo = [];
            console.log(JSON.stringify(courses));
            for (let i = 0; i < courses.length; i++) {
                let courseFound = await Courses.findOne({where: {course_id: courses[i].course_id}});
                coursesInfo.push(courseFound);
            }

            return coursesInfo;
        });
    }

    async getSkillBasedOnCourseIDUnity(id) {
        return await Skills.findAll({where: {course_id: id}});
    }

    async getCriteriaBasedOnCourseAndSkillIDs(courseid, skillid) {
        let query = 'select sc.criteria_id, sc.criteria_name,sc.criteria_type from sp2019_db.Skill_Criteria sc\n' +
            'inner join sp2019_db.Skills s \n' +
            'where sc.skill_id = s.skill_id and s.skill_id = ' + skillid + ' and s.course_id = ' + courseid + ';';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(criteria => {
            return criteria;
        });
    }

    async getSkillsBasedOnCourseIDInSession(courseid) {
        let query = 'select distinct skills.* from sp2019_db.Skills skills \n' +
            'inner join sp2019_db.Sessions sessions\n' +
            'on sessions.skill_id = skills.skill_id\n' +
            'where skills.course_id = ' + courseid + ';'

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(skills => {
            return skills;
        });
    }

    async getSessionsBasedOnSkillId(skillid, trainee_id) {
        let query = 'SELECT s.*, u2.first_name as trainer_firstname,u2.last_name as trainer_lastname, course.course_name,course.semester,course.year, skill.skill_name ,u1.first_name as trainee_firstname,u1.last_name as trainee_lastname\n' +
            'FROM sp2019_db.Sessions s\n' +
            'JOIN sp2019_db.Trainees AS trainee ON trainee.trainee_id = s.trainee_id\n' +
            'JOIN sp2019_db.Users u1 ON trainee.user_id = u1.user_id\n' +
            'JOIN sp2019_db.Trainers AS trainer ON trainer.trainer_id = s.trainer_id\n' +
            'JOIN sp2019_db.Users u2 ON trainer.user_id = u2.user_id\n' +
            'JOIN sp2019_db.Courses AS course ON course.course_id = s.course_id\n' +
            'JOIN sp2019_db.Skills AS skill ON skill.skill_id = s.skill_id\n' +
            'WHERE s.skill_id=' + skillid + ' and s.trainee_id=' + trainee_id + ';';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(sessions => {
            return sessions;
        });
    }

    async AddSessionComment(user, session_id, comment) {
        console.log(user);
        console.log(session_id);
        console.log(comment);

        if (user.trainer_role === 1) {
            Sessions.update(
                {trainer_comment: comment},
                {returning: true, where: {session_id: session_id}}
            )
        } else if (user.trainee_role === 1) {
            Sessions.update(
                {trainee_comment: comment},
                {returning: true, where: {session_id: session_id}}
            )
        }
    }

    async AddScoreComment(user, score_id, comment) {
        console.log(user);
        console.log(score_id);
        console.log(comment);

        if (user.trainer_role === 1) {
            Scores.update(
                {trainer_comment: comment},
                {returning: true, where: {score_id: score_id}}
            )
        }
    }

    async getSessionBasedOnFilters(sessionTrainerId, courseId, skillId, traineeId, trainerId) {

        let query = 'SELECT s.*, u2.first_name as trainer_firstname,u2.last_name as trainer_lastname, course.course_name,course.semester,course.year, skill.skill_name ,u1.first_name as trainee_firstname,u1.last_name as trainee_lastname\n' +
            'FROM sp2019_db.Sessions s\n' +
            'JOIN sp2019_db.Trainees AS trainee ON trainee.trainee_id = s.trainee_id\n' +
            'JOIN sp2019_db.Users u1 ON trainee.user_id = u1.user_id\n' +
            'JOIN sp2019_db.Trainers AS trainer ON trainer.trainer_id = s.trainer_id\n' +
            'JOIN sp2019_db.Users u2 ON trainer.user_id = u2.user_id\n' +
            'JOIN sp2019_db.Courses AS course ON course.course_id = s.course_id\n' +
            'JOIN sp2019_db.Skills AS skill ON skill.skill_id = s.skill_id\n';

        if (typeof trainerId === 'undefined') {
            if (typeof sessionTrainerId === 'undefined') {
            } else {
                console.log('++++ INSIDE TRAINERID +++++' + sessionTrainerId);
                query = query + 'WHERE s.trainer_id=' + sessionTrainerId;
            }


        } else {
            if (trainerId === 'All' || trainerId == 'all') {
            } else {
                console.log('++++ INSIDE TRAINERID !=ALL+++++' + trainerId);
                query = query + 'WHERE s.trainer_id=' + trainerId;
            }
        }

        if (courseId === 'All' || courseId === 'all') {
            console.log('++++ INSIDE COURSDID ALL+++++');
            if (traineeId === 'All' || traineeId === 'all') {
            } else {
                console.log('++++ INSIDE COURSDID ALL and TRAINEEID+++++' + traineeId);
                query = query + ' and s.trainee_id=' + traineeId + ';';
            }
        } else {
            console.log('++++ INSIDE COURSDID ' + courseId + '++++++++++');
            query = query + ' and s.course_id=' + courseId;
            if (skillId === 'All' || skillId === 'all') {
                if (traineeId === 'All' || traineeId === 'all') {
                } else {
                    query = query + ' and s.trainee_id=' + traineeId + ';';
                }
            } else {
                query = query + ' and s.skill_id=' + skillId;

                if (traineeId === 'All' || traineeId === 'all') {
                } else {
                    query = query + ' and s.trainee_id=' + traineeId + ';';
                }
            }
        }

        console.log(query);

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(sessions => {
            return sessions;
        });

    }

    async getScoreBasedOnSessionId(sessionid) {
        let query = 'select cs.*,skill_c.criteria_name from sp2019_db.Criteria_Scores cs\n' +
            'inner join sp2019_db.Skill_Criteria skill_c\n' +
            'on skill_c.criteria_id = cs.criteria_id\n' +
            'where cs.session_id=' + sessionid + ';';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(score => {
            return score;
        });
    }

    async getSessionBasedOnId(sessionid) {
        let query = 'SELECT s.*, u2.first_name as trainer_firstname,u2.last_name as trainer_lastname, course.course_name,course.semester,course.year, skill.skill_name ,u1.first_name as trainee_firstname,u1.last_name as trainee_lastname\n' +
            'FROM sp2019_db.Sessions s\n' +
            'JOIN sp2019_db.Trainees AS trainee ON trainee.trainee_id = s.trainee_id\n' +
            'JOIN sp2019_db.Users u1 ON trainee.user_id = u1.user_id\n' +
            'JOIN sp2019_db.Trainers AS trainer ON trainer.trainer_id = s.trainer_id\n' +
            'JOIN sp2019_db.Users u2 ON trainer.user_id = u2.user_id\n' +
            'JOIN sp2019_db.Courses AS course ON course.course_id = s.course_id\n' +
            'JOIN sp2019_db.Skills AS skill ON skill.skill_id = s.skill_id\n' +
            'WHERE s.session_id=' + sessionid + ';';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(sessions => {
            return sessions;
        });
    }

    async getCoursesWhichHaveSessions(user) {
        let query = '';
        if (user.trainee_role === 1) {
            console.log("+++" + user.trainee_role + "++++" + user.trainee_id + "+++");
            query = 'select distinct c.* from sp2019_db.Courses c\n' +
                'inner join sp2019_db.Sessions s\n' +
                'on s.course_id = c.course_id\n' +
                'inner join sp2019_db.Course_Trainees ctt\n' +
                'on ctt.course_id=c.course_id\n' +
                'where s.trainee_id = ' + user.trainee_id + ';';
        } else if (user.trainer_role === 1) {
            //console.log("+++" + user.trainer_role + "++++" + user.trainer_id + "+++");

            query = 'select distinct c.* from sp2019_db.Courses c\n' +
                'inner join sp2019_db.Sessions s\n' +
                'on s.course_id = c.course_id\n' +
                'inner join sp2019_db.Course_Trainers ctt\n' +
                'on ctt.course_id=c.course_id\n' +
                'where s.trainer_id = ' + user.trainer_id + ';';
        } else if (user.manager_role === 1) {
            query = 'select distinct c.* from sp2019_db.Courses c\n' +
                'inner join sp2019_db.Sessions s\n' +
                'on s.course_id = c.course_id\n' +
                'inner join sp2019_db.Course_Trainers ctt\n' +
                'on ctt.course_id=c.course_id;';
        }

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(courses => {
            return courses;
        });
    }

}

module.exports = new CourseRepository();