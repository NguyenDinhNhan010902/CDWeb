const connection = require('../connect/Db');

exports.login = (req, res) => {
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
};

exports.logout = (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error logging out:', err);
                res.json({ success: false, message: 'Error logging out' });
            } else {
                res.json({ success: true, message: 'Logout successful' });
            }
        });
    } else {
        res.json({ success: false, message: 'Not logged in' });
    }
};

exports.saveUserSession = (req, res) => {
    const userData = req.body;
    if (userData) {
        req.session.user = userData;
        res.json({ success: true, message: 'User session saved successfully' });
    } else {
        res.json({ success: false, message: 'Invalid user data' });
    }
};

exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
};
