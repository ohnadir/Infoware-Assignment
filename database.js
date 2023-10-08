const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infoware'
})

exports.create_employee = async (id, name, job_title, phone, email, address, city, state, emergency_phone) =>{
    
    try {
        const [result] = await pool.query(`
        INSERT INTO  employee(id, name, job_title, phone, email, address, city, state, emergency_phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [id, name, job_title, phone, email, address, city, state, emergency_phone])
        return result;
    } catch (error) {
        console.error(error);
    }
}

exports.employeeList = async (page, size) =>{
    const offset = (page - 1) * size;
    const countQuery = 'SELECT COUNT(*) AS total FROM employee';
    const dataQuery = 'SELECT * FROM employee LIMIT ? OFFSET ?';
    const [counts] = await pool.query(countQuery)
    const [rows] = await pool.query(dataQuery, [size, offset]);
    const data = {
        counts:counts[0],
        employees:rows
    }
    
    return data;
}

exports.employee = async (id) =>{
    const [rows] = await pool.query(` SELECT *  FROM employee WHERE id = ?`, [id])
    return rows[0]
}


exports.update_employee = async (id) =>{
    const [rows] = await pool.query("UPDATE * FROM employee")
    return rows
}

exports.deleteEmployee = async (id) =>{
    const [rows] = await pool.query(` DELETE FROM employee WHERE id = ?`, [id])
    return rows;
}