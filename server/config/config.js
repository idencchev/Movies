const config = { 
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/movies',
        CONNECTED_TO: 'MongoDB Local',
        SALT_ROUNDS: 10,
        JWT_SECRET: 'SOMESECRET',
        COOKIE_NAME: 'USER_SESSION'
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://idenchev:qweasdzxc@cluster0.fm1m3.mongodb.net/movies?retryWrites=true&w=majority', // Atlas
        CONNECTED_TO: 'MongoDB Atlas',
        SALT_ROUNDS: 10,
        JWT_SECRET: 'SOMESECRET',
        COOKIE_NAME: 'USER_SESSION'
    }
};

module.exports = config[process.env.NODE_ENV.trim()];
