const express = require('express');

const server = express();

const port = 3001;
/*request i reponse se dvata parametri na callbackot  na rutata */
server.get(`/`, (request, response) => {
    /*tuka se obrabotuva requestot sto stiga na rutata */
    response.send(`You have reached server!`)
})

server.listen(port, () => {
    console.log(`Server started on port ${port}, hello world!`);
    
});