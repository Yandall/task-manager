import {config as env} from 'dotenv'
env()
export const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_DEFAULT_TIME: '24h',
    JWT_EXTENDED_TIME: '30 days',
    KEYS: {
        IS_PUBLIC: 'isPublic'
    },
    DB: {
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT),
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
        NAME: process.env.DB_NAME
    }
}