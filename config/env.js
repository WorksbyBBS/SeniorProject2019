const env = {
    database: (process.env.APP_ENV === 'utest' || 'itest') ? 'sp2019_test_db' : 'sp2019_db',
    username: 'root',
    password: 'CSE_SP_2019',
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        // useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: "+03:00"
    },
    timezone: '+03:00', // your timezone comes here, ex.: 'US/Hawaii'
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;