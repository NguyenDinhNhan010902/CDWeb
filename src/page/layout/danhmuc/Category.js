import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import jQuery library;
import BASE_URL from '../../../database/Config';
import Nav from 'react-bootstrap/Nav';
import './style.css';

function Category() {
    const [danhMuc, setDanhMuc] = useState([]);

    useEffect(() => {
        // Fetch danh muc data using jQuery and Ajax
        $.ajax({
            url: `${BASE_URL}/danhmuc`,
            type: 'GET',
            success: function(response) {
                setDanhMuc(response);
            },
            error: function(error) {
                console.error('Error fetching danh muc: ', error);
            }
        });
    }, []);
    const renderSubMenu = (submenus) => {
        if (!Array.isArray(submenus) || submenus.length === 0) return null;

        return (
            <div className="dropdown-menu">
                {submenus.map(submenu => (
                    <Nav.Item key={submenu.id}>
                        <Nav.Link href="/listcategory">{submenu.name}</Nav.Link>
                    </Nav.Item>
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <Nav className="justify-content-center">
                {danhMuc.map((item, index) => (
                    <Nav.Item key={item.id}>
                        <Nav.Link
                            href={item.id === 0 ? "/home" : "/listcategory"}
                            className="custom-link">
                            {item.name}
                        </Nav.Link>
                        {renderSubMenu(item.submenus)}
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
}

export default Category;
