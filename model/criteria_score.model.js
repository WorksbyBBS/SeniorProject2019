module.exports = (sequelize, Sequelize) => {
    const Criteria_Score = sequelize.define('Criteria_Score', {
        score_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        score_value: {type: Sequelize.DOUBLE, allowNull:false},
        trainer_comment: {type: Sequelize.TEXT},
        criteria_id: {type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'Skill_Criteria',
                key: 'criteria_id'
            }},
        session_id: {type: Sequelize.INTEGER, allowNull: false,
            references: {
                model: 'Sessions',
                key: 'session_id'
            }},
    });

    return Criteria_Score;
}