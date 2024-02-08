const mySQL = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mySQL
    .createPool({
        // host: 'localhost', 
        // user: 'sa', 
        // password: '123456', 
        // database: 'dream_share' 
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();

//Test connection here
// Async function to execute SQL query
async function testCon() {
    // Execute query and get rows
    const [rows] = await pool.execute('SELECT * FROM account');
    // Return rows
    return rows;
}