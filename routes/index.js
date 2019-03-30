var express = require('express');
var router = express.Router();
var homeController = require('../controllers/HomeController');

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
 homeController.adminDashboard(req,res);
});

router.get('/logout',function (req,res,next) {
  homeController.logout(req,res);
});

router.get('/registerUser',isLoggedIn, function(req, res, next) {
  res.render('registerUser', { title: 'Register User' });
});

router.get('/courses',isLoggedIn, function(req, res, next) {
  homeController.manageCourses(req,res);
})

router.get('/assign-schedule',isLoggedIn, function(req, res, next) {
  homeController.assignSchedule(req,res);
});

router.get('/trainee-report', isLoggedIn, function (req, res, next) {
    homeController.TraineeReport(req, res)
});

router.get('/trainee-report/session/:sessionIdForm', isLoggedIn, function (req, res, next) {
    console.log(res.locals.session);
    homeController.TrainerToTrainee(req, res)
});

router.get('/trainer-report', isLoggedIn, function (req, res, next) {
    homeController.TrainerReport(req, res)
});

router.get('/manager-report', isLoggedIn, function (req, res, next) {
    homeController.TrainerReport(req, res)
});
/* POST LINKS */
router.post('/login', (req, res) => homeController.login(req,res));
router.post('/registerUser',isLoggedIn, (req, res) => homeController.registerUser(req,res));
router.post('/addCourse',isLoggedIn, (req, res) => homeController.addCourse(req,res));
router.post('/addSkill',isLoggedIn, (req, res) => homeController.addSkill(req,res));
router.post('/addCriteria',isLoggedIn, (req, res) => homeController.addCriteria(req,res));
router.post('/assign-course',isLoggedIn, (req, res) => homeController.AssignCourse(req,res));
router.post('/assign-course-trainee', isLoggedIn, (req, res) => homeController.AssignCourseTrainee(req, res));
router.post('/add-session-comment', isLoggedIn, (req, res) => homeController.AddSessionComment(req, res));

//router.post('/trainee-session-report', isLoggedIn, (req, res) => homeController.TrainerToTrainee(req, res));
//router.get('/trainee-session-report', isLoggedIn, (req, res) => res.render('trainerTraineeReport'));
//router.post('/assign-course-trainee',isLoggedIn, (req, res) => homeController.AssignCourseTrainee(req,res));
//router.post('/addCourse',isLoggedIn, (req, res) => homeController.registerUser(req,res));
// router.get('/', (req, res) => res.redirect('/home'));

//router.get('/home',isLoggedIn, (request, response) => response.render('home'))


module.exports = router;
