class UnityController {

    constructor() {
        this.userRepository = require('../models/UserRepository');
        this.courseRepository = require('../models/CourseRepository');
    }

    async login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        console.log(username + password);

        this.userRepository.loginUnity(username, password).then(user => {
            res.send(user);
        })
            .catch(e => {
                console.log(e);
                res.send(e);
            })
    }

    async addUserSession(req, res) {

        console.log("INSIDE POST SESSION");

        let criteriaJsonData = req.body.criteriaJson;
        let criteriaJsonParsed = JSON.parse(criteriaJsonData);
        let criteriaJson = criteriaJsonParsed.Items;
        let userId = req.body.userId;

        console.log("---UNITY---CRITERIA---" + JSON.stringify(criteriaJson));
        //console.log("---UNITY---USERID---"+userId);

        // this.courseRepository.addUserSession(criteria_json,user_id).catch(e => {
        //     res.send(e);
        // });
        //
        // res.send("DONE")

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