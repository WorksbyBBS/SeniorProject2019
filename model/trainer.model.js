module.exports = (sequelize, Sequelize) => {
    const Trainer = sequelize.define('Trainer', {
        trainer_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        }
    });
    return Trainer;
};