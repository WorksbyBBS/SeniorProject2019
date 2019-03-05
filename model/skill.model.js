module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define('Skill', {
        skill_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        skill_name: {type: Sequelize.STRING, allowNull:false,unique:true},
        course_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Courses',
                key: 'course_id'
            }
        },
    });

    return Skill;
}