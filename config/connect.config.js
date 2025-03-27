import mysql from 'mysql2';
import dbEnv from './dbEnv.config.js';

const conncetion = mysql.createConnection(dbEnv);

conncetion.connect((err) => {

    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
  
});

export default conncetion;