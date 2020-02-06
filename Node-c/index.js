const express = require('express');

const server = express();

const port = 3001;
/*request i reponse se dvata parametri na callbackot  na rutata */
server.get(`/`, (request, response) => {
    /*tuka se obrabotuva requestot sto stiga na rutata */
    response.status(200).send(`You have reached server!`)
})

//search by name  so query
server.get(`/users`, function (request, response) {
    
    try{
    const array = [`petko`,`stanko`,`pero`]

    const nam = request.query.name

    if(name && array.includes(name)) {
        response.status(200).send(name)
    }
    else{
        response.status(200).send(array)
    }
    }
    catch (error){
        console.error(error)
        response.status(500).send(`error`)
    }
})
//search by id
server.get(`/users/:id`, function (request, response) {

    const array = [`petko`,`stanko`,`pero`]
    //the route param value is in the request object
    const id = request.params.id

    if (array[id]) {
        response.status(200).send(array[id]);
    }
    else{
        response.status(200).send(`No data!`);
    }

})
//search by name
server.get(`user/:name` , (request,response) => {
    const array = [`petko`,`stanko`,`pero`]

    const name = request.params.name.toUpperCase()

    const found = array.find((element) => element.toUpperCase() === name)

    if (found) {
        response.status(200).send(found);
    }
    else{
        response.status(200).send(`No data!`);
    }
})

server.listen(port, () => {
    console.log(`Server started on port ${port}, hello world!`);
    
});