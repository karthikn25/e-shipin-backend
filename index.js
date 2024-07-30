const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('./db');
const path = require("path");
const { userRouter } = require('./Router/userRouter.js');
const { categoryRouter } = require('./Router/categoryRouter.js');


// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dotenv.config();


const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.json())

app.use(cors({}));

app.use(bodyParser.json());

dbConnection();

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/api/user",userRouter);

app.use("/api/category",categoryRouter)

app.listen(PORT,()=>console.log(`localhost running under:${PORT}`))
