const mongoose = require('mongoose');
database = process.env.DB;

// mongoose.connect(DB).then( ()=>console.log("connection successfull")).catch( (err)=>console.log("connection failure " + err));
const DbConnection = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("db connected successfully");
    }
    catch (error) {
        console.error("the following error occured:- " + error);
    }
}
module.exports = DbConnection