module.exports = (sequelize, Sequelize) => {
    const Course_Trainer = sequelize.define('Course_Trainer', {
        trainer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            default: -1,
            references: {
                model: 'Trainers',
                key: 'trainer_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            default: -1,
            references: {
                model: 'Courses',
                key: 'course_id'
            }
        },
    });

    return Course_Trainer;
}