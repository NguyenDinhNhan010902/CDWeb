import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './detail.css';
import $ from "jquery";
import BASE_URL from "../../database/Config"; // Đảm bảo bạn đã có tệp CSS của bạn
import CommentSection from "./comment/CommentSection";

import {useParams} from "react-router-dom";
import TextToSpeech from "./texttospeed/TextToSpeech";
import Image from "../img/Image";


function Detail() {
    const [detail, setDetail] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detailes?id=${id}`, type: "GET", success: function (response) {
                setDetail(response);
            }, error: function (error) {
                console.error("Lỗi khi lấy chi tiết: ", error);
            },
        });
    }, [id]);

    return (

        <Container className="text-center">
            {detail.map((item) => (<Row key={item.id}>
                    <Col>
                        <Col className="d-flex justify-content-center"> {/* Căn giữa nội dung */}
                            <div className="cate text-left"> {/* Đảm bảo có lớp text-left ở đây */}
                                <div className="header">
                                    <span>{item.name}</span>
                                </div>
                                <h2 className="article-title">{item.titel}</h2>
                            </div>
                        </Col>
                        <div className="audio-player">
                            <TextToSpeech
                                text={`${item.content} ${item.contenta}${item.contentb}${item.contentc}${item.contentd}${item.contente}`}/>
                        </div>
                        <p>{item.content}</p>
                        <p>{item.contenta}</p>
                        <Image
                            // src="../img/no-image.png"
                            src={item.img}
                            alt="Trường mầm non" className="article-image"
                        />
                        <div>
                            <p>{item.contentb}</p>
                            <p>{item.contentc}</p>
                            <p>{item.contentd}</p>
                            <p>{item.contente}</p>
                            <p>{item.contentb}</p>
                            <p>{item.contentc}</p>
                            <p>{item.contentd}</p>
                            <p>{item.contente}</p>
                        </div>
                        <CommentSection></CommentSection>
                    </Col>
                </Row>))}

        </Container>


    );
}

export default Detail;
