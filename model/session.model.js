module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define('Session', {
        session_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        trainer_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'Course_Trainee_Trainers',
                key: 'trainer_id'
            }
        },
        trainee_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'Course_Trainee_Trainers',
                key: 'trainee_id'
            }
        },
        course_id: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'Course_Trainee_Trainers',
                key: 'course_id'
            }
        },
        type: {type: Sequelize.INTEGER, allowNull: false},
        created_at: {type: Sequelize.DATE, allowNull: false},
        duration: {type: Sequelize.TIME, allowNull: false},
        trainer_comment: {type: Sequelize.STRING},
        final_score: {type: Sequelize.DOUBLE, allowNull: false},
        skill: {
            type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'Skills',
                key: 'skill_id'
            }
        }
    });

    return Session;
}