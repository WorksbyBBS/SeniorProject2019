module.exports = (sequelize, Sequelize) => {
    const Course_Trainer = sequelize.define('course_Trainer', {
        trainer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            default: -1,
            references: {
                model: 'trainers',
                key: 'trainer_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            default: -1,
            references: {
                model: 'courses',
                key: 'course_id'
            }
        },
    });

    return Course_Trainer;
}