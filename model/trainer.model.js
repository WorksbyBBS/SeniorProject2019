module.exports = (sequelize, Sequelize) => {
    const Trainer = sequelize.define('trainer', {
        trainer_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    });
    return Trainer;
};