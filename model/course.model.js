
module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define('Course', {
        course_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        course_name: {type: Sequelize.STRING, allowNull: false},
        semester: {type: Sequelize.STRING, allowNull: false},
        year: {type: Sequelize.INTEGER, allowNull: false}
    });

    return Course;
}