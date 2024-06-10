const connection = require('../connect/db');

exports.addComment = (req, res) => {
    const {username, comment } = req.body;
    if (!comment  || !username) {
        return res.status(400).json({ success: false, message: 'Thông tin không hợp lệ' });
    }
    const query = 'INSERT INTO comment (username ,comment  ) VALUES (?, ?)';
    connection.query(query, [username,comment], (error, results) => {
        if (error) {
            console.error('Lỗi khi thêm bình luận: ', error);
            return res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
        }
        res.status(200).json({ success: true, message: 'Bình luận đã được thêm', commentId: results.insertId });
    });
};
