const db = require('../config/db.config.js');
const Courses = db.courses;
const Skills = db.skills;
const Criteria = db.skill_criteria;
const Course_Trainee_Trainer = db.course_trainee_trainer;

class CourseRepository {

    async getAllCourses(user) {
        //manager can see courses
        if (user) {

            if (user.manager_role === 1) {
                return await Courses.findAll({});
            } else {
                throw "Not Authorized to Access Courses"
            }
        } else {
            throw "No User Logged In"
        }
    }

    async getAllCTT(user) {
        //manager can see courses
        if (user) {

            if (user.manager_role === 1) {
                return await Course_Trainee_Trainer.findAll({});
            } else {
                throw "Not Authorized to Access Courses"
            }
        } else {
            throw "No User Logged In"
        }
    }

    async getSkillsBasedOnCourseID(user, id) {
        //manager can see courses
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

    async getCourseInfoAndTrainer(user, trainer_id) {

        if (user) {
            if (user.manager_role === 1 || user.trainee_role === 1 || user.trainer_role === 1) {
                let query = 'select distinct courses.course_id, courses.course_name, courses.year, courses.semester,ctt.trainer_id, users.first_name,users.last_name from sp2019_db.Users users\n' +
                    'inner join sp2019_db.Course_Trainee_Trainers ctt\n' +
                    'inner join sp2019_db.Trainers trainers\n' +
                    'inner join sp2019_db.Courses courses\n' +
                    'on courses.course_id=ctt.course_id \n' +
                    'and ctt.trainer_id = trainers.trainer_id\n' +
                    'and trainers.user_id = users.user_id;';

                return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(result => {
                    return result;
                });
            } else {
                throw "Not Authorized to Access Skills"
            }
        } else {
            throw "No User Logged In"
        }

    }

    async addCourse(courseObj) {

        return  await Courses.create({
            course_name: courseObj.course_name,
            semester: courseObj.semester,
            year: courseObj.year
        });
    }

    async assignCourseTrainerTrainee(course_id, trainer_id, selectedTraineesIDs) {
        let i = 0;
        let ctArray = [];
        for (i; i < selectedTraineesIDs.length; i++) {
            let ct = await Course_Trainee_Trainer.create({
                course_id: course_id,
                trainer_id: trainer_id,
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
                    criteria_name: criteriaObj.criteria1
                });
            }
            case '2': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    }]);
            }
            case '3': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }]);
            }
            case '4': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    }]);
            }
            case '5': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5
                    }]);
            }
            case '6': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6
                    }]);
            }
            case '7': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7
                    }]);
            }
            case '8': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria8
                    }]);
            }
            case '9': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria8
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria9
                    }]);
            }
            case '10': {
                return await Criteria.bulkCreate([{
                    skill_id: criteriaObj.skill_id,
                    criteria_name: criteriaObj.criteria1
                },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria2
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria3
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria4
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria5
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria6
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria7
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria8
                    },
                    {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria9
                    }, {
                        skill_id: criteriaObj.skill_id,
                        criteria_name: criteriaObj.criteria10
                    }]);
            }
        }
    }

    async getUserCourses(userId) {
        return await Course_Trainee_Trainer.findAll({where:{trainee_id:userId}}).then(async courses =>{
            let coursesInfo = [];
            console.log(JSON.stringify(courses));
            for(let i=0;i<courses.length;i++){
                let courseFound = await Courses.findOne({where:{course_id:courses[i].course_id}});
                coursesInfo.push(courseFound);
            }

            return coursesInfo;
        });
    }

    async getSkillBasedOnCourseIDUnity(id){
        return await Skills.findAll({where: {course_id: id}});
    }

    async getCriteriaBasedOnCourseAndSkillIDs(courseid, skillid) {
        let query = 'select sc.criteria_id, sc.criteria_name from sp2019_db.Skill_Criteria sc\n' +
            'inner join sp2019_db.Skills s \n' +
            'where sc.skill_id = s.skill_id and s.skill_id = ' + skillid + ' and s.course_id = ' + courseid + ';';

        return await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(criteria => {
            return criteria;
        });
    }

}

module.exports = new CourseRepository();