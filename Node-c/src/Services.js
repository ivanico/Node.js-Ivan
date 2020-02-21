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

    async getBooksByAuthor (req,res) {
        try{
            const books =await models.Book.find({ author:req.params.name })
            res.status(200).json(books)
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }

    //sejvuvanje kniga

    async createNewBook (req,res) {
        
        try{

            const data = req.body          //samo se stava se u data

            const found = await models.Book.findOne({ isbn: data.isbn })  //se srcha u datata seite isbn
            if(found){
                res.status(400).json({massage:'book alrady exists', book:found})           

                return
            }
            const newBook = models.Book(data)    // moze i posle ova .save
            const saved = await newBook.save()

            if(saved){
                res.status(201).json('Succesffully added a new book')
            }
            else{
                res.status(400).json('error in the data object')
            }
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }

    async removeBook (req,res) {
        try{
            const deleted = await models.Book.deleteOne({isbn:req.params.isbn})
            if(deleted.deletedCount>0){
                res.status(201).json('Succesffully delted!')
            }
            else{
                res.status(400).json('general err')
            }
        }
        catch (err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }


}

module.exports = new Services()