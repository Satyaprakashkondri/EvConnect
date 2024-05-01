const app = require("./app.js");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({path: "config/config.env"})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log(err.message);
})

app.listen(4000,()=>{
    console.log("Server running on http://localhost:4000/");
})