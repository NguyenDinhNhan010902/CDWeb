import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import './style.css';

function Casss() {
    const [danhMuc, setDanhMuc] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu HTTP để lấy dữ liệu từ API khi component được tạo ra
        fetch('http://localhost:8080/api/danhmucs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch danh muc');
                }
                return response.json();
            })
            .then(data => setDanhMuc(data))
            .catch(error => console.error('Error fetching danh muc: ', error));
    }, []); // Tham số thứ hai là một mảng rỗng, đảm bảo useEffect chỉ được gọi một lần khi component được tạo ra

    return (
        <div>
            {console.log('Current danhMuc state:', danhMuc)}
            <Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
                {danhMuc.map((item, index) => (
                    <Nav.Item key={item.id}>
                        <Nav.Link>{item.name}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );

}

export default Casss;
