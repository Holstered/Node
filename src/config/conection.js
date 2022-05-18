const mongoose = require("mongoose")

class Connection{
    constructor(){
        this.dataBaseConnectionMongoDb()
    }

    dataBaseConnectionMongoDb(){
        this.mongoDbConnection = mongoose.connect("mongodb://localhost/8080" , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true
        })
            .then(()=>{
                console.log('Conexão estabelecida com MongoDB')
            })
            .catch((error)=>{
                console.log(`Erro na conexão estabelecida com MongoDB: ${error}`)
            })
    }
}

module.exports = new Connection();