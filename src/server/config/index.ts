import * as dotenv from 'dotenv';
dotenv.config();

export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
};

export const jwt_config = {
    secret: process.env.JWT_SECRET!,
    expiration: process.env.JWT_EXPIRATION!
};