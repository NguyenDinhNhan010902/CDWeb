import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import $ from 'jquery';
import BASE_URL from '../../../../database/Config';
import { Link } from 'react-router-dom';
import './listcate.css';
import HandleNewsClick from "../../../../utils/HandleNewsClick";

function ListCategory() {
    const { id, subid } = useParams();
    const [listdanhMuc, setListDanhMuc] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        console.log(`Fetching details for cateId: ${id}, subId: ${subid}`);
        $.ajax({
            url: `${BASE_URL}/details?${subid ? `subId=${subid}` : `cateId=${id}`}`,
            type: 'GET',
            success: function(response) {
                console.log('Response:', response);
                    setListDanhMuc(response); // Set the response as it is
            },
            error: function(error) {
                console.error('Error fetching danh muc: ', error);
            }
        });
    }, [id, subid]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the current items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listdanhMuc.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Container >
            <Row className="my-4">
                {currentItems.map((item) => (
                    <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={item.id} >
                        <Link to={`/detail/${item.id}`} onClick={() => HandleNewsClick(item.id)} className="his">
                            <Card style={{ width: '18rem',height:'100%' }}>
                                <Card.Img variant="top" src={item.img}  style={{ width: '100%', height:'190px' }}/>
                                <Card.Body>
                                    <Card.Title className="subTitleCate">{item.titel}</Card.Title>
                                    <Card.Text className="truncate">
                                        {item.content}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
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
                    {Array.from({ length: Math.ceil(listdanhMuc.length / itemsPerPage) }, (_, index) => (
                        <MDBPaginationItem active={currentPage === index + 1} key={index}>
                            <MDBPaginationLink href="#" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    ))}
                    <MDBPaginationItem disabled={currentPage === Math.ceil(listdanhMuc.length / itemsPerPage)}>
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
        </Container>
    );
}

export default ListCategory;
