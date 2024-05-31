import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import BASE_URL from "../../database/Config";
import $ from "jquery";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Seach() {
    const query = useQuery();
    const searchTerm = query.get("q");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            $.ajax({
                url: `${BASE_URL}/seach?q=${searchTerm}`,
                method: 'GET',
                success: (response) => {
                    setResults(response);
                },
                error: (error) => {
                    console.error('Lỗi khi tìm kiếm kết quả:', error);
                }
            });
        }
    }, [searchTerm]);

    const safeResults = Array.isArray(results) ? results : [];

    return (
            <Row className="my-4 justify-content-center">
                {safeResults.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                        <Card style={{ width: '18rem', textAlign: 'center' }}>
                            <Link to="/detail">
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
                    </Col>
                ))}
            </Row>
    );
}

export default Seach;
