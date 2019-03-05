module.exports = (sequelize, Sequelize) => {
    const Trainee = sequelize.define('Trainee', {
        trainee_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        }
    });

    return Trainee;
}