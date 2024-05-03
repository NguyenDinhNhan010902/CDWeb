const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

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

app.use(cors());

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
