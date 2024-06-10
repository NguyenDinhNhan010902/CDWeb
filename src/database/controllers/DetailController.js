const connection = require('../connect/Db');

exports.getDetails = (req, res) => {
    const cateId = req.query.cateId;
    const subId = req.query.subId;
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
