const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: "92.249.45.155",
  user: "u466446141_dev_root",
  password: "Ge5]Kj2i?nA",
  database: "u466446141_login_node",
});

// Route
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});
// all customers
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM user';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Not result');
      }
    });
  });
  
  app.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM user WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('Not result');
      }
    });
  });
  
  app.post('/add', (req, res) => {
    const sql = 'INSERT INTO user SET ?';
  
    const customerObj = {
      name: req.body.name,
      city: req.body.city
    };
  
    connection.query(sql, customerObj, error => {
      if (error) throw error;
      res.send('Customer created!');
    });
  });
  
  app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;
    const sql = `UPDATE user SET name = '${name}', city='${city}' WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Customer updated!');
    });
  });
  
  app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM user WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Delete customer');
    });
  });
  
  // Check connect
  connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
  });
  
  connection.on('uncaughtException', function(err) {
    logger.log('error', 'Fatal uncaught exception crashed cluster', err, function(err, level, msg, meta) {
      console.log(`Server running on port ${PORT}`)
      connection.exit(1);
    });
});

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));