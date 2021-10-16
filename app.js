const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qevwy35y',
  database: 'progate'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  }else{
  console.log('success');
  }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM todo',
    (error, results) => {
      
      console.log(results);
      res.render('hello.ejs');
    }
  );
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM todo',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO todo (action) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM todo WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE todo SET action = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM todo WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});


app.listen(3000);