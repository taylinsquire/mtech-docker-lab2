const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csvStringifier = createCsvStringifier({
  path: './db/users.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'name', title: 'name' },
    { id: 'email', title: 'email' },
    { id: 'age', title: 'age' },
  ],
});

const dbPath = __dirname + '/db/users.csv';

app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  users = [];
  const db = fs.createReadStream(dbPath);
  db.pipe(csv())
    .on('data', (row) => {
      users.push(row);
    })
    .on('end', () => {
      res.render('userList', { users: users });
      db.close();
    });
});

app.get('/new-user-form', (req, res) => {
  res.render('newUser');
});

app.post('/new-user-form', (req, res) => {
  let newUser = {
    id: generateID(),
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  users.push(newUser);
  saveCsv();
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  res.render('editUser', { user: users.find((user) => user.id == req.params.id) });
});

app.post('/edit/:id', (req, res) => {
  let user = users.find((user) => user.id == req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.age = req.body.age;
  saveCsv();
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  users = users.filter((user) => user.id != req.params.id);
  saveCsv();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running');
});

function saveCsv() {
  let usersCsv = csvStringifier.stringifyRecords(users).trim();
  usersCsv = 'id,name,email,age\n' + usersCsv;
  const db = fs.createWriteStream(dbPath);
  db.write(usersCsv);
  db.close();
}

function generateID() {
  let id = 0;
  console.log(users);
  users.forEach((user) => {
    if (user.id >= id) {
      id = parseInt(user.id) + 1;
    }
  });
  return id;
}
