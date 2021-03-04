const mongoose = require('mongoose');
//const BD_CNN= 'mongodb+srv://mean_user:imfY766OUOl2NR5S@cluster0.uyzbe.mongodb.net/test';

const dbConn = async() => {


    try {
        await mongoose.connect(process.env.BD_CNN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB listo');
    } catch( error ) {
        console.log(error);
        throw new Error('Error con la inicializacion de a la BD');
    }
}
module.exports = {
    dbConn
}
// imfY766OUOl2NR5S