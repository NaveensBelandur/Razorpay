const Mongoosee = require('mongoose')

const SetUpDb = async () =>{
    try{
      const connect = await Mongoosee.connect(`mongodb+srv://Naveen:${process.env.DATABASEPWD}@cluster0.rrtnxw8.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DATABASEPWD}`)
      if(connect){
        console.log(`Connected to the DataBase`)
      }
    }
    catch(err){
        console.error('Database connection error:', err.message);
        throw new Error('Database connection failed');
    }
}

module.exports = SetUpDb