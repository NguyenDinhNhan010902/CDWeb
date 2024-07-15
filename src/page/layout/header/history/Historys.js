import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import BASE_URL from "../../../../database/Config";
import {MDBPagination, MDBPaginationItem, MDBPaginationLink} from "mdb-react-ui-kit";

function Historys() {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            $.ajax({
                url: `${BASE_URL}/verify`,
                type: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                success: function(response) {
                    setUserId(response.user.id);
                },
                error: function(xhr, status, error) {
                    console.error('Error verifying token:', error);
                    setUserId('');
                }
            });
        }
    }, []);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the current items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (userId) {
            $.ajax({
                url: `${BASE_URL}/history?user_id=${userId}`,
                type: "GET",
                success: function(response) {
                    setData(response);
                },
                error: function(error) {
                    console.error("Error fetching history: ", error);
                }
            });
        }
    }, [userId]);

    return (
        <>
            {userId ? (
                <Container>
                    <Row className="my-4 justify-content-center">
                        {currentItems.sort((a, b) => b.id - a.id).map((item) => (
                            <Col sm={6} md={4} lg={3} className="mb-4" key={item.id}>
                                <Card style={{ width: '18rem' }} className="mb-5 d-flex">
                                    <Card.Img variant="top" src={item.img} style={{ width: '100%', height:'190px' }} />
                                    <Card.Body>
                                        <Link to={`/detail/${item.newid}`} className="subTitle">
                                            <Card.Title className="subTitleCate truncate">{item.titel}</Card.Title>
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
            ) : (
                <Container>
                    <Row className="my-4 justify-content-center">
                        <Col>
                            <h3>Bạn cần đăng nhập để xem lịch sử của mình.</h3>
                        </Col>
                    </Row>
                </Container>
            )}
            <div className="pagination-container">
                <MDBPagination className="mb-0">
                    <MDBPaginationItem disabled={currentPage === 1}>
                        <MDBPaginationLink
                            href="#"
                            aria-label="Previous"
                            onClick={() => handlePageChange(currentPage - 1)}>
                            <span aria-hidden="true">«</span>
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                        <MDBPaginationItem active={currentPage === index + 1} key={index}>
                            <MDBPaginationLink href="#" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    ))}
                    <MDBPaginationItem disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
                        <MDBPaginationLink
                            href="#"
                            aria-label="Next"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <span aria-hidden="true">»</span>
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            </div>
        </>
    );
}

export default Historys;
