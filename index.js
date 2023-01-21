const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// agar cookies bisa di set
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  };

app.use(cors(corsOptions));

const db = require("./config/Database.js");
const router = require("./routes/User.js");
const port = 4000;

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(router);

db.authenticate()
    .then(() => {
        app.listen(port, () => console.log('Server running at http://localhost:'+port));
    })