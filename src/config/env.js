const config = {
    port: process.env.PORT || 3000,
    mongoDB: {
        publicDB: process.env.MONGODB_URI,
        localDB: process.env.MONGO_DB_URL
    },
    auth: {
        salt: process.env.SALT_ROUNDS,
    },
    token: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expire: process.env.JWT_EXPIRE,
        jwt_expire_refresh_token: process.env.JWT_EXPIRE_REFRESH_TOKEN
    }
}

const validateConfig = () => {
    if (!config.mongoDB.publicDB && !config.mongoDB.localDB) {
        throw new Error('MongoDB is required in .env file')
    }
}
validateConfig()
module.exports = config;