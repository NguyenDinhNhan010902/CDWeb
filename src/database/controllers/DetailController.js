const connection = require('../connect/Db');

exports.getDetails = (req, res) => {
    const cateId = req.query.cateId;
    const subId = req.query.subId;
    if (!cateId && !subId) {
        return res.status(400).send('cateId or subId is required');
    }
    let query = 'SELECT * FROM detail WHERE ';
    let params = [];
    if (cateId) {
        query += 'cateId = ?';
        params.push(cateId);
    } else if (subId) {
        query += 'subId = ?';
        params.push(subId);
    }

    connection.query(query, params, (error, results) => {
        if (error) {
            console.error('Error fetching details: ', error);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
};


exports.getDetailById = (req, res) => {
    const id = req.params.id;
    connection.query(
        `SELECT * FROM detail 
         INNER JOIN detailcontent ON detail.id = detailcontent.id 
         INNER JOIN danhmuc ON detail.cateId = danhmuc.id 
         INNER JOIN danhmuccon ON detail.subId = danhmuccon.id 
         WHERE detail.id = ?`,
        [id],
        (error, results) => {
            if (error) {
                console.error('Error fetching detail: ', error);
                return res.status(500).send('Internal Server Error');
            }
            res.json(results);
        }
    );
};

exports.searchDetails = (req, res) => {
    const searchTerm = req.query.q;
    connection.query('SELECT * FROM detail WHERE titel LIKE ?', [`%${searchTerm}%`], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};
exports.getDetail =  (req, res) => {
    connection.query('SELECT * FROM detail', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
};
exports.getDetailes =  (req, res) => {
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
};
exports.getDetailNew =  (req, res) => {
    const cateId = req.query.cateId;
    const subId = req.query.subId;
    connection.query('SELECT * FROM detail WHERE cateId= ? AND subId = ?',[cateId, subId] ,(error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
};
exports.addHistory = (req, res) => {
    const { newsId,userId } = req.body;
    const query = 'INSERT INTO history (news_id,user_id) VALUES (?,?)';
    connection.query(query, [newsId,userId], (error, results) => {
        if (error) {
            console.error('Error adding news to history:', error);
            res.status(500).json({ success: false, message: 'Failed to add news to history' });
        } else {
            console.log('News added to history');
            res.status(200).json({ success: true, message: 'News added to history' });
        }
    });
};
exports.getHistory = (req, res) => {
    const userid = req.query.user_id; // Lấy userId từ yêu cầu
    // Sử dụng prepared statement với dấu ? và truyền giá trị tham số như là một mảng
    connection.query(
        'SELECT history.id, detail.id as newid, detail.img, detail.titel, detail.content, history.user_id ' +
        'FROM history ' +
        'INNER JOIN detail ON detail.id = history.news_id ' +
        'INNER JOIN users ON history.user_id = users.id ' +
        'WHERE history.user_id = ?',
        [userid], // Truyền giá trị của userId vào đây
        (error, results, fields) => {
            if (error) {
                console.error('Error fetching user history:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch user history' });
            } else {
                res.status(200).json(results);
            }
        }
    );
};
