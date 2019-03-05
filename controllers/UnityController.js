class UnityController {

    constructor() {
        this.userRepository = require('../models/UserRepository');
        this.courseRepository = require('../models/CourseRepository');
    }

    async login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        this.userRepository.loginUnity(username, password).then(user => {
            res.send(user);
        })
            .catch(e => {
                console.log(e);
                res.send(e);
            })
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
        console.log(id);
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
}

module.exports = new UnityController();