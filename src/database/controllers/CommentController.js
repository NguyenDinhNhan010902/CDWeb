const connection = require('../connect/Db');

exports.addComment = (req, res) => {
    const {postId, username, userId, comment,timed } = req.body; // Lấy thêm userId từ body
    if (!postId || !username || !userId || !comment) {
        return res.status(400).json({ success: false, message: 'Thông tin không hợp lệ' });
    }
    const query = 'INSERT INTO comment (postId ,username, userId, comment,timed) VALUES (?, ?, ?, ?,?)';
    connection.query(query, [postId , username, userId, comment,timed], (error, results) => {
        if (error) {
            console.error('Lỗi khi thêm bình luận: ', error);
            return res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
        }
        res.status(200).json({ success: true, message: 'Bình luận đã được thêm', commentId: results.insertId });
    });
};
// exports.getComment = (req, res) => {
//     connection.query('SELECT * FROM comment', (error, results, fields) => {
//         if (error) throw error;
//         res.send(results);
//     });
// };
exports.getComment =  (req, res) => {
    const postId = parseInt(req.query.postId); // Get postId from query parameters
    if (!postId) {
        return res.status(400).json({ error: 'Missing postId parameter' });
    }
    // Query to get comments by postId
    const sql = 'SELECT * FROM comment WHERE postId = ?';
    connection.query(sql, [postId], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Error querying database' });
        }
        res.json(results); // Send comments as JSON response
    });
};
