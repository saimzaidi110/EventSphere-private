const mongoose = require("mongoose");

const ConnectDB= async()=>{

await mongoose.connect(process.env.DBURI || "mongodb+srv://admin:admin@cluster0.tdskrt4.mongodb.net/Eproject")
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Not Connected!'))
}

module.exports=ConnectDB