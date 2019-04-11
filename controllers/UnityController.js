class UnityController {

    constructor() {
        this.userRepository = require('../repositories/UserRepository');
        this.courseRepository = require('../repositories/CourseRepository');
    }

    async login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        console.log(username + password);

        this.userRepository.loginUnity(username, password).then(user => {

            req.session.user = user;
            // console.log(req.session.user);
            res.send(user);
        })
            .catch(e => {
                console.log(e);
                res.send(e);
            })
    }

    async addUserSession(req, res) {

        console.log("INSIDE POST SESSION  ");

        let criteriaJsonData = req.body.criteriaJson;
        let criteriaJsonParsed = JSON.parse(criteriaJsonData);
        let criteriaJson = criteriaJsonParsed.Items;
        
        let traineeId = req.body.traineeId;
        let courseId = req.body.courseId;
        let skillId = req.body.skillId;
        let duration = req.body.duration;
        let type = req.body.type;

        console.log(traineeId);
        console.log(courseId);
        console.log(skillId);
        console.log(duration);
        console.log(type);
        console.log("---UNITY---CRITERIA---" + JSON.stringify(criteriaJson));
        //console.log("---UNITY---USERID---"+userId);

        //criteria_json, trainee_id, course_id, skill_id, duration,type
        let result = this.courseRepository.addUserSession(criteriaJson, traineeId, courseId, skillId, duration, type).catch(e => {
            res.send(e);
        });

        if (result)
            res.send("DONE");
        else
            res.send("CANNOT ADD");

    }

    async getUserCourses(req,res){
        let id = req.params.id;
        // let id = req.body.userId;
        console.log(id);
        let courses = await this.courseRepository.getUserCourses(id).catch(e => {
            res.send(e);
        });
        //console.log(courses);
        let jsonObj = {
            Items:courses
        };
        res.json(jsonObj);
        // res.json(courses);
    }

    async getCourseSkills(req,res){
        let id = req.params.id;
        // let id = req.body.userId;
        //console.log(id);
        let skills = await this.courseRepository.getSkillBasedOnCourseIDUnity(id).catch(e => {
            res.send(e);
        });
        //console.log(courses);
        let jsonObj = {
            Items:skills
        };
        res.json(jsonObj);
        // res.json(courses);
    }

    async getCriteriaBasedOnCourseAndSkillIDs(req, res) {
        let courseid = req.params.courseid;
        let skillid = req.params.skillid;

        console.log('courseid: ' + courseid + ' -- skillid: ' + skillid);
        let criteria = await this.courseRepository.getCriteriaBasedOnCourseAndSkillIDs(courseid, skillid).catch(e => {
            res.send(e);
        });

        let jsonObj = {
            Items: criteria
        };
        res.json(jsonObj);
    }
}

module.exports = new UnityController();