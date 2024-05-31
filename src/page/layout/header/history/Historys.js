import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom";
import React from "react";

function Historys() {
    return (
        <Row className="my-4 justify-content-center">
            <Card style={{width: '18rem'}} className="mb-4 d-flex justify-content-center">
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Link to="/detail" className="subTitle">
                        <Card.Title className="subTitleCate">Card Title</Card.Title>
                    </Link>
                    <Card.Text className="truncate">
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default Historys;