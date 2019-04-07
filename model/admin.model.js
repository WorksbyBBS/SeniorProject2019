
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('Admin', {
        admin_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        }
    // }, {
    //     classMethods: {
        //         associate: function (repositories) {
        //             Admin.belongsTo(repositories.User, {foreignKey: 'user_id', targetKey: 'user_id'});
    //         }
    //     }
    });

    return Admin;
}