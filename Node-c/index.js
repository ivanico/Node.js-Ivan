const express = require('express');

const routes = require(`./src/Routes`)  //vaka se importira funkcija od dr js file

const cors =require('cors')

const bodyParser = require('body-parser') //npm install body-parser

const server = express();

server.use(cors());

const port = 3001;

const localStorage = [];

localStorage.push({isbn:`1`, name:`Harry Potter`})
localStorage.push({isbn:`2`, name:`World of warcraft`})
localStorage.push({isbn:`3`, name:`Witcher`})
localStorage.push({isbn:`4`, name:`The lord of the rings`})
localStorage.push({isbn:`5`, name:`Star wars`})

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())


// localStorage['1'] = 'Petko';
// localStorage['2'] = 'Mirko';
// localStorage['3'] = 'Stanko';

routes.Routes(server, localStorage);                       //vaka se povikuva


server.listen(port, () => {
    console.log(`Server started on port ${port}, hello world!`);
    
});


