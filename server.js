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

app.use(
"/api/contacts",
require("./src/routes/contactRoutes")
);

app.use(
require("./src/middleware/errorHandler")
);

app.listen(
5000,
() => {
console.log(
"Server running on port 5000"
);
}
);