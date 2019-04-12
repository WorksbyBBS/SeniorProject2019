var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');
var courseController = require('../controllers/CourseController');

//Middleware function to check if user is logged in before requesting pages
function isLoggedIn(req, res, next) {
  //if not logged in
  if (!req.session.user) {
    //console.log('User is not Logged In', req.session.user);
    res.render('login', { title: 'Login' });
  } else {
    res.locals.session = req.session;
    // console.log(req.session);
    // console.log(res.locals.session);
    return next()
  }
}

/* GET LINKS */
router.get('/' ,isLoggedIn, function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('userprofile', { title: 'Profile' });
});

router.get('/dashboard',isLoggedIn,function (req,res,next) {
    userController.adminDashboard(req, res);
});

router.get('/logout',function (req,res,next) {
    userController.logout(req, res);
});

router.get('/registerUser',isLoggedIn, function(req, res, next) {
  res.render('registerUser', { title: 'Register User' });
});

router.get('/courses',isLoggedIn, function(req, res, next) {
    courseController.manageCourses(req, res);
})

router.get('/assign-schedule',isLoggedIn, function(req, res, next) {
    courseController.assignSchedule(req, res);
});

router.get('/trainee-report', isLoggedIn, function (req, res, next) {
    courseController.TraineeReport(req, res)
});

router.get('/trainee-report/session/:sessionIdForm', isLoggedIn, function (req, res, next) {
    courseController.TrainerToTrainee(req, res)
});

router.get('/trainer-report', isLoggedIn, function (req, res, next) {
    userController.TrainerReport(req, res)
});

router.get('/manager-report', isLoggedIn, function (req, res, next) {
    userController.TrainerReport(req, res)
});
/* POST LINKS */
router.post('/login', (req, res) => userController.login(req, res));
router.post('/registerUser', isLoggedIn, (req, res) => userController.registerUser(req, res));
router.post('/addCourse', isLoggedIn, (req, res) => courseController.addCourse(req, res));
router.post('/addSkill', isLoggedIn, (req, res) => courseController.addSkill(req, res));
router.post('/addCriteria', isLoggedIn, (req, res) => courseController.addCriteria(req, res));
router.post('/assign-course', isLoggedIn, (req, res) => courseController.AssignCourse(req, res));
router.post('/assign-course-trainee', isLoggedIn, (req, res) => courseController.AssignCourseTrainee(req, res));
router.post('/add-session-comment', isLoggedIn, (req, res) => courseController.AddSessionComment(req, res));
router.post('/add-score-comment', isLoggedIn, (req, res) => courseController.AddScoreComment(req, res));

//router.post('/trainee-session-report', isLoggedIn, (req, res) => homeController.TrainerToTrainee(req, res));
//router.get('/trainee-session-report', isLoggedIn, (req, res) => res.render('trainerTraineeReport'));
//router.post('/assign-course-trainee',isLoggedIn, (req, res) => homeController.AssignCourseTrainee(req,res));
//router.post('/addCourse',isLoggedIn, (req, res) => homeController.registerUser(req,res));
// router.get('/', (req, res) => res.redirect('/home'));

//router.get('/home',isLoggedIn, (request, response) => response.render('home'))


module.exports = router;
