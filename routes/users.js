var express = require('express');
var router = express.Router();
var homeController = require('../controllers/HomeController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/courses',function (req,res,next) {
 homeController.getAllCourses(req,res);
});

router.get('/api/ctt',function (req,res,next) {
 homeController.getAllCTT(req,res);
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

module.exports = router;
