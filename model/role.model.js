module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        role_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        admin_role: {type: Sequelize.BOOLEAN},
        manager_role: {type: Sequelize.BOOLEAN},
        trainer_role: {type: Sequelize.BOOLEAN},
        trainee_role: {type: Sequelize.BOOLEAN},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    });

    return Role;
}