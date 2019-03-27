var express = require('express');
var router = express.Router();
var homeController = require('../controllers/HomeController')

/* GET users listing. */

router.get('/api/courses',function (req,res,next) {
 homeController.getAllCourses(req,res);
});

router.get('/api/ctrainers', function (req, res, next) {
    homeController.getAllCTrainers(req, res);
});

router.get('/api/ctrainees', function (req, res, next) {
    homeController.getAllCTrainees(req, res);
});


router.get('/api/trainers',function (req,res,next) {
 homeController.getAllTrainers(req,res);
});

router.get('/api/trainees',function (req,res,next) {
 homeController.getAllTrainees(req,res);
});

router.get('/api/course/:course_id/skills',function (req,res,next) {
 homeController.getSkillsBasedOnCourseID(req,res);
});

router.get('/api/course/:course_id/skills/sessions', function (req, res, next) {
 homeController.getSkillsBasedOnCourseIDInSession(req, res);
});

router.get('/api/:skill_id/sessions', function (req, res, next) {
 homeController.getSessionsBasedOnSkillId(req, res);
});

router.get('/api/:session_id/score', function (req, res, next) {
 homeController.getScoreBasedOnSessionId(req, res);
});

router.get('/api/sessions/:session_id', function (req, res, next) {
 homeController.getSessionBasedOnId(req, res);
});

router.get('/api/sessions/:course_id/:skill_id/:trainee_id', function (req, res, next) {
    homeController.getSessionBasedOnFilters(req, res);
});

router.get('/api/sessions/:trainer_id/:course_id/:skill_id/:trainee_id', function (req, res, next) {
    homeController.getSessionBasedOnFilters(req, res);
});

module.exports = router;
