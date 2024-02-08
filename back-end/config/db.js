import mySQL from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mySQL
    .createPool({
        host: 'localhost', //process.env.MYSQL_HOST,
        user: 'sa', //process.env.MYSQL_USER,
        password: '123456', //rocess.env.MYSQL_PASSWORD,
        database: 'dream_share', //process.env.MYSQL_DATABASE,
    }).promise();

//Test connection here
async function testCon() {
    const [rows] = await pool.execute('SELECT * FROM account')
    return rows
}

const acc = await testCon();
console.log(acc);