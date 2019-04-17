
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admin', {
        admin_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    // }, {
    //     classMethods: {
        //         associate: function (models) {
        //             Admin.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'user_id'});
    //         }
    //     }
    });

    return Admin;
}