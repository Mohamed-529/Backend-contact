const express =
require("express");

const dotenv =
require("dotenv");

const connectDB =
require("./src/config/db");

dotenv.config();

connectDB();

const app =
express();

app.use(
express.json()
);

app.get(
"/",

(req,res)=>{

res
.status(200)

.json({

success:true,

message:
"Contact Management API is running",

version:
"1.0",

developer:
"Mohamed Yusuff"

});

}
);

app.use(
"/api/contacts",
require("./src/routes/contactRoutes")
);

app.use(
require("./src/middleware/errorHandler")
);

const PORT =
process.env.PORT
||
5000;


app.listen(

PORT,

()=>{

console.log(

`Server running on ${PORT}`

);

});