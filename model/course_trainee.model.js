module.exports = (sequelize, Sequelize) => {
    const Course_Trainee = sequelize.define('course_Trainee', {
        trainee_id: {
            type: Sequelize.INTEGER,
            default:-1,
            primaryKey: true,
            references: {
                model: 'trainees',
                key: 'trainee_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER,
            default:-1,
            primaryKey: true,
            references: {
                model: 'courses',
                key: 'course_id'
            }
        },
    });

    return Course_Trainee;
}