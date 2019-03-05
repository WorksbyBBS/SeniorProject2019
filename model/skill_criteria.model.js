module.exports = (sequelize, Sequelize) => {
    const Skill_Criteria = sequelize.define('Skill_Criteria', {
        criteria_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        criteria_name: {type: Sequelize.STRING, allowNull:false},
        skill_id: {type: Sequelize.INTEGER,
        allowNull: false,
            references: {
                model: 'Skills',
                key: 'skill_id'
            }},
    });

    return Skill_Criteria;
}