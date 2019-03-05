module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define('Manager', {
        manager_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        }
    });

    return Manager;
}