const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const MySQLStore = require('express-mysql-session')(session);
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // Đổi 'http://example.com' thành nguồn gốc thực của ứng dụng của bạn
    methods: ['GET', 'POST'], // Chỉ cho phép các phương thức GET và POST
    allowedHeaders: ['Content-Type', 'Authorization'], // Chỉ cho phép các tiêu đề được liệt kê
    credentials: true // Cho phép gửi cookie qua CORS
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cdweb' // Thay 'tendatabase' bằng tên cơ sở dữ liệu của bạn
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});
const sessionStore = new MySQLStore({}, connection);
app.use(session({
    secret: 'cdwebtintuc2024',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, sameSite: 'lax', secure: false }
}));
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                // Lưu trạng thái đăng nhập và thông tin người dùng vào localStorage
                // localStorage.setItem('isLoggedIn', true);
                // localStorage.setItem('user', JSON.stringify(results[0]));

                res.json({ success: true, message: 'Login successful', user: results[0] });
            } else {
                res.json({ success: false, message: 'Incorrect email or password' });
            }
        });
    } else {
        res.json({ success: false, message: 'Please enter email and password' });
    }
});


// Server-side code (Node.js)
app.get('/danhmuc', (req, res) => {
    connection.query('SELECT * FROM danhmuc', (error, results, fields) => {
        if (error) {
            console.error('Error fetching danh muc: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Lấy danh sách danh mục con
        connection.query('SELECT * FROM danhmuccon', (err, subResults, fields) => {
            if (err) {
                console.error('Error fetching danh muc con: ', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            // Biến đổi dữ liệu để gom nhóm danh mục con theo parent_id
            const danhMucMap = {};
            subResults.forEach(subItem => {
                const parentId = subItem.paren_id;
                if (!danhMucMap[parentId]) {
                    danhMucMap[parentId] = [];
                }
                danhMucMap[parentId].push(subItem);
            });
            // Gắn danh mục con vào danh mục chính
            results.forEach(item => {
                item.submenus = danhMucMap[item.id] || [];
            });
            res.json(results);
        });
    });
});
app.get('/detail', (req, res) => {
    connection.query('SELECT * FROM detail', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/details', (req, res) => {
    const cateId = req.query.cateId;
    const subId = req.query.subId;
    console.log('Received request for details with cateId:', cateId, 'and subId:', subId);
    if (!cateId && !subId) {
        return res.status(400).send('cateId or subId is required');
    }
    let query = 'SELECT * FROM detail WHERE ';
    let params = [];
    if (subId) {
        query += 'subId = ?';
        params.push(subId);
    } else if (cateId) {
        query += 'cateId = ?';
        params.push(cateId);
    }

    connection.query(query, params, (error, results, fields) => {
        if (error) {
            console.error('Error fetching details: ', error);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});


app.get('/detail', (req, res) => {
    connection.query('SELECT * FROM detail', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/detailes', (req, res) => {
    const id = req.query.id;
    connection.query('SELECT * FROM detail INNER JOIN ' +
        'detailcontent on detail.id = ' +
        'detailcontent.id INNER JOIN danhmuc O' +
        'N detail.cateId = danhmuc.id INNER JOIN danhmuccon O' +
        'N detail.subId = danhmuccon.id WHERE detail.id = ?', [id], (error, results, fields) => {
        if (error) {
            console.error('Error fetching details: ', error);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});
app.get('/seach', (req, res) => {
    const searchTerm = req.query.q;
    const query = `SELECT * FROM detail WHERE titel LIKE ?`;
    connection.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
app.get('/check-session', (req, res) => {
    if (req.session.loggedin && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});
app.post('/saveusersession', (req, res) => {
    const userData = req.body;
    if (userData) {
        req.session.user = userData;
        res.json({ success: true, message: 'User session saved successfully' });
    } else {
        res.json({ success: false, message: 'Invalid user data' });
    }
});
app.post('/logout', (req, res) => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (req.session.loggedin) {
        // Nếu đã đăng nhập, xóa dữ liệu người dùng khỏi session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error logging out:', err);
                res.json({ success: false, message: 'Error logging out' });
            } else {
                res.json({ success: true, message: 'Logout successful' });
            }
        });
    } else {
        // Nếu chưa đăng nhập, trả về thông báo lỗi
        res.json({ success: false, message: 'Not logged in' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
