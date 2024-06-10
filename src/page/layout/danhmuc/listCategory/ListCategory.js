import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import BASE_URL from '../../../../database/Config';
import { Link } from 'react-router-dom';
import './listcate.css';

function ListCategory() {
    const { id, subid } = useParams();
    const [listdanhMuc, setListDanhMuc] = useState([]);

    useEffect(() => {
        console.log(`Fetching details for cateId: ${id}, subId: ${subid}`);

        $.ajax({
            url: `${BASE_URL}/details?${subid ? `subId=${subid}` : `cateId=${id}`}`,
            type: 'GET',
            success: function(response) {
                console.log('Response:', response);
                setListDanhMuc(response);
            },
            error: function(error) {
                console.error('Error fetching danh muc: ', error);
            }
        });
    }, [id, subid]);

    return (
        <Container>
            <Row className="my-4">
                {listdanhMuc.map((item) => (
                    <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={item.id}>
                        <Card style={{ width: '18rem' }}>
                            <Link to={`/detail/${item.id}`}>
                                <Card.Img variant="top" src={item.img} />
                            </Link>
                            <Card.Body>
                                <Link to={`/detail/${item.id}`} className="subTitle">
                                    <Card.Title className="subTitleCate">{item.titel}</Card.Title>
                                </Link>
                                <Card.Text className="truncate">
                                    {item.content}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ListCategory;
