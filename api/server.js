const app = require("./app")
const { connectDatabase } = require("./config/db")
const { cloudinaryConnect } = require("./config/cloudinaryConnect")

cloudinaryConnect();
connectDatabase();
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on port `, process.env.PORT)
})
