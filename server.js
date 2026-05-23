const express =
require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const rateLimit = require("express-rate-limit");

const mongoSanitize = require("express-mongo-sanitize");

const morgan = require("morgan");

const swaggerOptions = {
definition:{
openapi:"3.0.0",
info:{
title:"Contact API",
version:"1.0.0"
}
},
apis:["./src/routes/*.js"]
};

const swaggerDocs =
swaggerJsdoc(swaggerOptions);

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

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
limit: 100, // max 100 requests
message: {
success: false,
message: "Too many requests, please try again later"
}
});


app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(limiter);

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

app.use("/api-docs",
swaggerUi.serve,
swaggerUi.setup(swaggerDocs)
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