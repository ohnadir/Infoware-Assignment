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


exports.update_employee = async (id, name, job_title, phone, email, address, city, state, emergency_phone) =>{
    const [exist] = await pool.query(` SELECT *  FROM employee WHERE id = ?`, [id]);
    const updatedFields = {};
    
    if (name !== undefined && name !== exist[0].name) {
        updatedFields.name = name;
    }
    if (job_title !== undefined && job_title !== exist[0].job_title) {
        updatedFields.job_title = job_title;
    }
    if (phone !== undefined && phone !== exist[0].phone) {
        updatedFields.phone = phone;
    }
    if (email !== undefined && email !== exist[0].email) {
        updatedFields.email = email;
    }
    if (address !== undefined && address !== exist[0].address) {
        updatedFields.address = address;
    }

    if (city !== undefined && city !== exist[0].city) {
        updatedFields.city = city;
    }
    if (state !== undefined && state !== exist[0].state) {
        updatedFields.state = state;
    }
    if (emergency_phone !== undefined && emergency_phone !== exist[0].emergency_phone) {
        updatedFields.emergency_phone = emergency_phone;
    }

    const updateQuery = `
        UPDATE employee
        SET ${Object.keys(updatedFields).map((key) => `${key} = ?`).join(', ')} 
        WHERE id = ?
    `;
    const updatedValues = Object.values(updatedFields);
    updatedValues.push(id);
    const [rows] = await pool.query(updateQuery, updatedValues)
    return rows
}

exports.deleteEmployee = async (id) =>{
    const [rows] = await pool.query(` DELETE FROM employee WHERE id = ?`, [id])
    return rows;
}