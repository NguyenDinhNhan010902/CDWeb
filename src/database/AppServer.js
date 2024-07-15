// AppServer.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./a/Auth');
const danhmucRoutes = require('./a/Danhmuc');
const detailsRoutes = require('./a/Details');
const commentRoutes = require('./a/Comment');
const JwtAction = require('./middelwave/JwtAction');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Sử dụng các route không cần xác thực
app.use('/', authRoutes);

// Sử dụng middleware để bảo vệ các route cần xác thực và phân quyền

app.use('/danhmuc', danhmucRoutes);
app.use('/', detailsRoutes);
app.use('/comment', commentRoutes);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
