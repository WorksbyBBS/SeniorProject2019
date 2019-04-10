const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    dialectOptions: {
        // useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: "+03:00"
    },
    timezone: '+03:00', // your timezone comes here, ex.: 'US/Hawaii'
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
db.admins = require('../model/admin.model.js')(sequelize, Sequelize);

db.trainees = require('../model/trainee.model.js')(sequelize, Sequelize);
db.trainers = require('../model/trainer.model.js')(sequelize, Sequelize);
db.managers = require('../model/manager.model.js')(sequelize, Sequelize);
db.roles = require('../model/role.model.js')(sequelize, Sequelize);

db.courses = require('../model/course.model.js')(sequelize, Sequelize);
db.course_trainee = require('../model/course_trainee.model.js')(sequelize, Sequelize);
db.course_trainer = require('../model/course_trainer.model.js')(sequelize, Sequelize);

db.skills = require('../model/skill.model.js')(sequelize, Sequelize);
db.skill_criteria = require('../model/skill_criteria.model.js')(sequelize, Sequelize);

db.sessions = require('../model/session.model.js')(sequelize, Sequelize);
db.criteria_scores = require('../model/criteria_score.model.js')(sequelize, Sequelize);






module.exports = db;