module.exports = (sequelize, Sequelize) => {
    const Course_Trainee = sequelize.define('Course_Trainee', {
        trainee_id: {
            type: Sequelize.INTEGER,
            default:-1,
            primaryKey: true,
            references: {
                model: 'Trainees',
                key: 'trainee_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER,
            default:-1,
            primaryKey: true,
            references: {
                model: 'Courses',
                key: 'course_id'
            }
        },
    });

    return Course_Trainee;
}