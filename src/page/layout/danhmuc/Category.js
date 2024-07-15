import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import BASE_URL from '../../../database/Config';
import Nav from 'react-bootstrap/Nav';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
function Category() {
    const [danhMuc, setDanhMuc] = useState([]);
    useEffect(() => {
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
                        <Nav.Link as={Link} to={`/listcategory/${submenu.paren_id}/${submenu.id}`}>{submenu.namecon}</Nav.Link>
                    </Nav.Item>
                ))}
            </div>
        );
    };
    return (
        <div className="container" >
            <Nav className="justify-content-center" >
                <div style={{background:'red',width:'0px', marginRight:'30px'}} >
                    <Link to="/home">
                        <FontAwesomeIcon icon={faHouse} style={{color:'black',marginTop:'10px', float: 'left',fontSize:'20px'}} />
                    </Link>
                </div>
                {danhMuc.map((item) => (
                    <Nav.Item key={item.id} style={{fontFamily:'bold'}}>
                        <Nav.Link
                            as={Link}
                            to={item.id === 0 ? "/home" : `/listcategory/${item.id}`}
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
