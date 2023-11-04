const app =require("./app")
const {connectDatabase} =require("./config/db")
const cloudinary=require("cloudinary");

connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port `,process.env.PORT)
})

//cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

