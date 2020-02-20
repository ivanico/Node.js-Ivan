const models = require('./Models');



class Services {

    getInitialRoute ( req , res ) {
       res.status(200).send('You have reached the server!')
    }

    async getAllBooks (req, res) {
        try{
            const books =await models.Book.find({year: {$gt: '2000'}})  //bi mozelo i so $regex /20*/    /\*20*/
            res.status(200).json(books)
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }

}

module.exports = new Services()