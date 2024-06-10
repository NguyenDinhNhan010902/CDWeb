const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const sessionMiddleware = require('./config/session');
const authRoutes = require('./a/Auth');
const danhmucRoutes = require('./a/Danhmuc');
const detailsRoutes = require('./a/Details');
const commentRoutes = require('./a/Comment');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// app.use(sessionMiddleware);

app.use('/', authRoutes);
app.use('/danhmuc', danhmucRoutes);
app.use('/', detailsRoutes);
app.use('/comment', commentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
