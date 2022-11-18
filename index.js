const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/Database.js");
const router = require("./routes/User.js");
const port = 4000
dotenv.config();
const app = express();
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

db.authenticate()
    .then(() => {
        app.listen(port, () => console.log('Server running at http://localhost:'+port));
    })