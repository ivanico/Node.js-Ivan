const express = require('express');

const routes = require(`./src/Routes`)  //vaka se importira funkcija od dr js file

const cors =require('cors')

const server = express();

server.use(cors());

const port = 3001;

routes.Routes(server);                       //vaka se povikuva

server.listen(port, () => {
    console.log(`Server started on port ${port}, hello world!`);
    
});