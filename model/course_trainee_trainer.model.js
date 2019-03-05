module.exports = (sequelize, Sequelize) => {
    const Course_Trainee_Trainer = sequelize.define('Course_Trainee_Trainer', {
        trainee_id: {
            type: Sequelize.INTEGER,
            default:-1,
            references: {
                model: 'Trainees',
                key: 'trainee_id'
            }
        },
        trainer_id: {
            type: Sequelize.INTEGER,
            default:-1,
            references: {
                model: 'Trainers',
                key: 'trainer_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER,
            default:-1,
            references: {
                model: 'Courses',
                key: 'course_id'
            }
        },
    });

    return Course_Trainee_Trainer;
}