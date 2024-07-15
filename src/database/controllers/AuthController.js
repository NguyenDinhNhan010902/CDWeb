const { promisify } = require('util');
const connection = require('../connect/Db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'chuyendeweb';

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        try {
            const query = 'SELECT id, username, role, password FROM users WHERE username = ?';
            const promisifiedQuery = promisify(connection.query).bind(connection);
            const rows = await promisifiedQuery(query, [username]);

            if (rows.length > 0) {
                const storedPassword = rows[0].password;
                const passwordMatch = await bcrypt.compare(password, storedPassword);

                if (passwordMatch) {
                    const userData = {
                        id: rows[0].id,
                        username: rows[0].username,
                        role: rows[0].role
                    };
                    try {
                        const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
                        res.json({ success: true, token });
                    } catch (error) {
                        console.error('Lỗi khi tạo token:', error);
                        res.status(500).json({ success: false, message: 'Lỗi khi tạo token' });
                    }
                    // const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
                    //
                    // res.json({ success: true, token });
                }
                // else {
                //     res.status(401).json({ success: false, message: ' mật khẩu không đúng' });
                // }
            } else {
                res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            res.status(500).json({ success: false, message: 'Lỗi' });
        }
    }
    else {
        res.status(400).json({ success: false, message: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
    }
};

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        const promisifiedInsertQuery = promisify(connection.query).bind(connection);
        await promisifiedInsertQuery(insertQuery, [username, hashedPassword, email]);

        res.status(201).json({ success: true, message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
    }
};

exports.verify = (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'không có token' });
    }

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Failed to authenticate token:', err);
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        // Kiểm tra thời gian hết hạn của token
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: 'không có token' });
        }
        res.json({
            message: 'Token hết hạn.',
            user: decoded
        });
    });
};
