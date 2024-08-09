import mysql from "mysql";
import dotenv from "dotenv"
dotenv.config({path: "../config/config.env"});

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.PASSWORD || 'Aurionpro@local.com',
    database: process.env.DB_NAME || 'clonedb'
});

console.log("database config:", {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.PASSWORD || 'Aurionpro@local.com',
    database: process.env.DB_NAME || 'clonedb'
    });

db.connect(err => {
    if (err) {
        console.error('Error connecting to MYSQL:', err);
        return;
    }
    console.log('MYSQL connected successfully...');
});

export default db;