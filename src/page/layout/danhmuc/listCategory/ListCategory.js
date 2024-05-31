import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import $ from "jquery";
import BASE_URL from "../../../../database/Config";
import {Link} from "react-router-dom";
import './listcate.css'


function ListCategory() {
    const [listdanhMuc, setListDanhMuc] = useState([]);

    useEffect(() => {
        // Fetch danh muc data using jQuery and Ajax
        $.ajax({
            url: `${BASE_URL}/detail`,
            type: 'GET',
            success: function(response) {
                setListDanhMuc(response);
            },
            error: function(error) {
                console.error('Error fetching danh muc: ', error);
            }
        });
    }, []);
    return (
        <Container>
            <Row className="my-4">
                {listdanhMuc.map((item) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card style={{ width: '18rem' }}>
                        <Link to="/detail"  >
                        <Card.Img variant="top" src={item.img} />
                        </Link>
                        <Card.Body>
                            <Link to="/detail" className="subTitle">
                            <Card.Title className="subTitleCate">{item.titel}</Card.Title>
                            </Link>
                            <Card.Text className="truncate">
                                {item.content}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>))}

            </Row>
        </Container>
    );
}

export default ListCategory;
