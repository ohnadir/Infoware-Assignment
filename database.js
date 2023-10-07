const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infoware'
})

exports.create_employee = async (id, name, job_title, phone, email, address, city, state, emergency_phone, relationship) =>{
    
    try {
        const [result] = await pool.query(`
        INSERT INTO  employee(id, name, job_title, phone, email, address, city, state, emergency_phone, relationship)
        VALUES (?, ?)
        `, [id, name, job_title, phone, email, address, city, state, emergency_phone, relationship])
        return result;
    } catch (error) {
        console.error(error);
    }
}

exports.employee = async (id) =>{
    const [rows] = await pool.query(`
    SELECT * 
    FROM employee
    WHERE id = ?
    `, [id])
    return rows[0]
}

exports.employeeList = async () =>{
    const [rows] = await pool.query("SELECT * FROM employee")
    return rows
}

exports.update_employee = async (id) =>{
    const [rows] = await pool.query("UPDATE * FROM employee")
    return rows
}

exports.deleteEmployee = async (id) =>{
    const [rows] = await pool.query(` DELETE * FROM employee WHERE id = ?
    `, [id])
    console.log(rows)
    return rows[0]
}