
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        user_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: Sequelize.STRING, allowNull: false, unique:true},
        password: {type: Sequelize.STRING, allowNull: false},
        first_name: {type: Sequelize.STRING, allowNull: false},
        last_name: {type: Sequelize.STRING, allowNull: false},
        phone: {type: Sequelize.STRING, allowNull: false},
        address: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false,unique:true}
    });

    return User;
}