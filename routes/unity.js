var express = require('express');
var router = express.Router();
var unityController = require('../controllers/UnityController');

router.post('/login', (req, res) => unityController.login(req,res));
router.get('/:id/courses',(req,res)=>{
    unityController.getUserCourses(req,res);
});

router.get('/:id/skills',(req,res)=>{
    unityController.getCourseSkills(req,res);
});

router.get('/:courseid/:skillid/criteria', (req, res) => {
    unityController.getCriteriaBasedOnCourseAndSkillIDs(req, res);
});

router.post('/userSession', (req, res) => {
    unityController.addUserSession(req, res);
});

module.exports = router;