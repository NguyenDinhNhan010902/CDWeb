import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import './style.css';

function Category() {
    const [danhMuc, setDanhMuc] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/danhmuc')
            .then(response => {
                setDanhMuc(response.data);
            })
            .catch(error => {
                console.error('Error fetching danh muc: ', error);
            });
    }, []);

    const renderSubMenu = (submenus) => {
        if (!Array.isArray(submenus) || submenus.length === 0) return null;

        return (
            <div className="dropdown-menu">
                {submenus.map(submenu => (
                    <Nav.Item key={submenu.id}>
                        <Nav.Link href="#">{submenu.name}</Nav.Link>
                    </Nav.Item>
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <Nav className="justify-content-center">
                {danhMuc.map(item => (
                    <Nav.Item key={item.id}>
                        <Nav.Link eventKey="/detail">{item.name}</Nav.Link>
                        {renderSubMenu(item.submenus)}
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
}

export default Category;
