const express = require("express");
const path = require('path');


const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection (Assuming you have a module for this)
const dbConnect = require("./config/database");
dbConnect();

// Serve files from the uploads directory under the '/uploads' route
// app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(express.json());


// Import routes
const router = require("./routes/AllRoutes");
app.use("/api/v1/Verifyit", router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

