var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController')
var courseController = require('../controllers/CourseController')

/* GET users listing. */

router.get('/api/courses',function (req,res,next) {
    courseController.getAllCourses(req, res);
});

router.get('/api/ctrainers', function (req, res, next) {
    courseController.getAllCTrainers(req, res);
});

router.get('/api/ctrainees', function (req, res, next) {
    courseController.getAllCTrainees(req, res);
});


router.get('/api/trainers',function (req,res,next) {
    userController.getAllTrainers(req, res);
});

router.get('/api/trainees',function (req,res,next) {
    userController.getAllTrainees(req, res);
});

router.get('/api/course/:course_id/skills',function (req,res,next) {
    courseController.getSkillsBasedOnCourseID(req, res);
});

router.get('/api/course/:course_id/skills/sessions', function (req, res, next) {
    courseController.getSkillsBasedOnCourseIDInSession(req, res);
});

router.get('/api/:skill_id/sessions', function (req, res, next) {
    courseController.getSessionsBasedOnSkillId(req, res);
});

router.get('/api/:session_id/score', function (req, res, next) {
    courseController.getScoreBasedOnSessionId(req, res);
});

router.get('/api/sessions/:session_id', function (req, res, next) {
    courseController.getSessionBasedOnId(req, res);
});

router.get('/api/sessions/:course_id/:skill_id/:trainee_id', function (req, res, next) {
    courseController.getSessionBasedOnFilters(req, res);
});

router.get('/api/sessions/:trainer_id/:course_id/:skill_id/:trainee_id', function (req, res, next) {
    courseController.getSessionBasedOnFilters(req, res);
});

module.exports = router;
