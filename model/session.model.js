module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define('session', {
        session_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        trainer_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'course_Trainers',
                key: 'trainer_id'
            }
        },
        trainee_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'course_Trainees',
                key: 'trainee_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'courses',
                key: 'course_id'
            }
        },
        type: {type: Sequelize.STRING, allowNull: false},
        duration: {type: Sequelize.TIME, allowNull: false},
        trainer_comment: {type: Sequelize.STRING},
        trainee_comment: {type: Sequelize.STRING},
        final_score: {type: Sequelize.DOUBLE, allowNull: false},
        skill_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'skills',
                key: 'skill_id'
            }
        }
    });

    return Session;
}