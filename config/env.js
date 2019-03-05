const env = {
    database:'sp2019_db',
    username: 'root',
    password: 'CSE_SP_2019',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;