const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');

const authRoutes   = require('./routes/auth.route');
const statusRoutes = require('./routes/status.route');
const postRoutes   = require('./routes/post.route');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/statuses', statusRoutes);
app.use('/api/posts', postRoutes);

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
