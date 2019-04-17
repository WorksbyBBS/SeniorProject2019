module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define('skill', {
        skill_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        skill_name: {type: Sequelize.STRING, allowNull:false,unique:true},
        course_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'course_id'
            }
        },
    });

    return Skill;
}