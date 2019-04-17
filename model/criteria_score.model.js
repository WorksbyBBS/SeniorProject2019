module.exports = (sequelize, Sequelize) => {
    const Criteria_Score = sequelize.define('criteria_Score', {
        score_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        score_value: {type: Sequelize.DOUBLE, allowNull:false},
        trainer_comment: {type: Sequelize.TEXT},
        criteria_id: {type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'skill_Criteria',
                key: 'criteria_id'
            }},
        session_id: {type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'sessions',
                key: 'session_id'
            }},
    });

    return Criteria_Score;
}