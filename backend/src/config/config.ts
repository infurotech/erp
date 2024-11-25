import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const config = {
    DB: {
        type: process.env.DATABASE_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mongodb',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'test_db',
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: process.env.DB_LOGGING === 'true',
    }
};

export default config;
