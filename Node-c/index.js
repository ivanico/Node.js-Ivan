const express = require('express');

const Routes = require(`./src/Routes`)  //vaka se importira funkcija od dr js file

const cors =require('cors')

const bodyParser = require('body-parser') //npm install body-parser

const server = express();

require("dotenv").config();            //dotenv

const mongoose = require ('mongoose') //npm install mongoose

const models = require('./src/Models');

server.use(cors());

const port = 3001;



// const localStorage = [];

// localStorage.push({isbn:`1`, name:`Harry Potter`})
// localStorage.push({isbn:`2`, name:`World of warcraft`})
// localStorage.push({isbn:`3`, name:`Witcher`})
// localStorage.push({isbn:`4`, name:`The lord of the rings`})
// localStorage.push({isbn:`5`, name:`Star wars`})

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())


// localStorage['1'] = 'Petko';
// localStorage['2'] = 'Mirko';
// localStorage['3'] = 'Stanko';

Routes(server);                       //vaka se povikuva rutite

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-j520k.mongodb.net/test?retryWrites=true&w=majority`,{useNewUrlParser: true , useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", () => {console.log('error connecting'+ error)});
db.once('open', () => {
    console.log('Successfully connected to MDB')
    server.listen(port, () => {
        console.log(`Server started on port ${port}, hello world!`);
        
        // const firstBook = new models.Book({
        //     isbn:1,
        //     title:'Chernobyl',
        //     author:'Pero',
        //     year:'1976'
        // })             //bez const firstBook moze da se sejvne posle objektot.save
        
        // firstBook.save(( err , book ) => {
        //     if (err) {
        //         console.log('Data was not saved :' + err)
        //     }
        //     else{
        //         console.log(book)
        //     }
        // });
    });
})




