const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chuyendeweb';

const JwtAction = (req, res, next) => {
    // Lấy token từ header Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
            } else {
                req.userData = decoded; // Lưu thông tin người dùng vào req để các middleware khác có thể sử dụng
                next(); // Cho phép đi tiếp sang middleware tiếp theo
            }
        });
    } else {
        return res.status(401).json({ success: false, message: 'Token không được cung cấp' });
    }
};

module.exports = JwtAction;
