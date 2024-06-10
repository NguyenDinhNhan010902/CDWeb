const connection = require('../connect/Db');


exports.getDanhMuc = (req, res) => {
    connection.query('SELECT * FROM danhmuc', (error, results) => {
        if (error) {
            console.error('Error fetching danh muc: ', error);
            return res.status(500).send('Internal Server Error');
        }

        connection.query('SELECT * FROM danhmuccon', (err, subResults) => {
            if (err) {
                console.error('Error fetching danh muc con: ', err);
                return res.status(500).send('Internal Server Error');
            }

            const danhMucMap = {};
            subResults.forEach(subItem => {
                const parentId = subItem.paren_id;
                if (!danhMucMap[parentId]) {
                    danhMucMap[parentId] = [];
                }
                danhMucMap[parentId].push(subItem);
            });

            results.forEach(item => {
                item.submenus = danhMucMap[item.id] || [];
            });

            res.json(results);
        });
    });
};
