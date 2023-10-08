const  { create_employee, employeeList, employee, update_employee, deleteEmployee } =require('./database.js')
const  express = require('express')
const app = express();
app.use(express.json())

app.post("/employee/create_employee", async (req, res) => {
    const { id, name, job_title, phone, email, address, city, state, emergency_phone, relationship } = req.body
    const employee = await create_employee(id, name, job_title, phone, email, address, city, state, emergency_phone, relationship)
    res.status(201).send(employee);
})


app.get("/employees", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const employees = await employeeList(page, size)
    res.status(200).json({
        code : 200,
        status : "success",
        data: employees
    });
})

app.get("/employee/:id", async (req, res) => {
    const id = req.params.id;
    const singleEmployee= await employee(id)
    res.status(200).json({
        code : 200,
        status : "success",
        singleEmployee: singleEmployee
    });
})

app.patch("/employee/update/:id", async (req, res) => {
    const id = req.params.id;
    await update_employee(id)
    res.status(200).json({
        code : 200,
        status : "success",
        message: "Employee Update Successfully"
    });
})

app.delete("/employee/delete/:id", async (req, res) => {
    const id = req.params.id;
    await deleteEmployee(id);
    res.status(200).json({
        code : 200,
        status : "success",
        message: "Employee Delete Successfully"
    });
})


app.get("/", async (req, res) => {
    res.status(500).send('Infoware Assignment server is Running')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
})
  
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})