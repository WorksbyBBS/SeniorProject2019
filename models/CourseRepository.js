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
        // let ct = await Course_Trainee_Trainer.update({
        //     trainer_id: trainer_id
        // }, {where: {course_id: course_id}});
        //
        // return ct;
    }

    // async assignCourseTrainee(course_id, selectedTraineesIDs) {
    //
    //     //if >1, update the one record that exists (if null), then insert the rest.
    //     //if >1 and record is not null, insert the others
    //     // If only 1, update the record that exists
    //     if (selectedTraineesIDs.length > 1) {
    //
    //         //find existing record with course_id
    //         let existingRecord = await Course_Trainee_Trainer.findOne({course_id: course_id});
    //
    //         //find existing record with course_id where the trainee_id is null
    //         let query = 'select * from sp2019_db.Course_Trainee_Trainers where course_id=' + course_id + ' and trainee_id is null;';
    //         let existingRecordWithoutTrainee = await Course_Trainee_Trainer.findOne({
    //             course_id: course_id,
    //             trainee_id: -1
    //         })
    //         console.log(existingRecordWithoutTrainee);
    //
    //         //it exists with a trainee, so insert others
    //         if (existingRecordWithoutTrainee !== null) {
    //             let ctArray = [];
    //             for (let i = 0; i < selectedTraineesIDs.length; i++) {
    //                 ctArray.push(await Course_Trainee_Trainer.create({
    //                     trainee_id: selectedTraineesIDs[i],
    //                     trainer_id: existingRecord.trainer_id,
    //                     course_id: existingRecord.course_id
    //                 }, {where: {course_id: course_id}}));
    //             }
    //             return ctArray;
    //
    //             //it doesn't have a trainee, so update it with the first trainee and insert the rest
    //         } else {
    //             //update
    //             let ct = await Course_Trainee_Trainer.update({
    //                 trainee_id: selectedTraineesIDs[0]
    //             }, {where: {course_id: course_id}});
    //             let ctArray = [];
    //
    //
    //             ctArray.push(ct);
    //             //insert rest
    //             for (let i = 1; i < selectedTraineesIDs.length; i++) {
    //                 ctArray.push(await Course_Trainee_Trainer.create({
    //                     trainee_id: selectedTraineesIDs[i],
    //                     trainer_id: existingRecord.trainer_id,
    //                     course_id: existingRecord.course_id
    //                 }, {where: {course_id: course_id}}));
    //             }
    //
    //             return ctArray;
    //         }
    //     } else {
    //         let ct = await Course_Trainee_Trainer.update({
    //             trainee_id: selectedTraineesIDs[0]
    //         }, {where: {course_id: course_id}});
    //         return ct;
    //     }
    // }

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

}

module.exports = new CourseRepository();