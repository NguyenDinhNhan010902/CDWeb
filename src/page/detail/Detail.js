import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './detail.css';
import $ from "jquery";
import BASE_URL from "../../database/Config"; // Đảm bảo bạn đã có tệp CSS của bạn
import CommentSection from "./comment/CommentSection";

import {Link, useParams} from "react-router-dom";
import TextToSpeech from "./texttospeed/TextToSpeech";
import Image from "../img/Image";
import HandleNewsClick from "../../utils/HandleNewsClick";


function Detail() {
    const [detail, setDetail] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const {id} = useParams();
    const [cateId, setCateId] = useState(null);
    const [subId, setSubId] = useState(null);
    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detailes?id=${id}`,
            type: "GET",
            success: function (response) {
                setDetail(response);
                if (response && response.length > 0) {
                    setDetail(response);

                    const cateId = response[0].cateId;
                    const subId = response[0].subId;
                    if (cateId && subId) {
                        setCateId(cateId);
                        setSubId(subId)
                        console.log(`CateId set to: ${cateId}`);
                    } else {
                        console.error('CateId not found in response');
                    }
                } else {
                    console.error('Response is empty or invalid');
                }
            }, error: function (error) {
                console.error("Lỗi khi lấy chi tiết: ", error);
            },
        });
    }, [id]);
    useEffect(() => {
        if (cateId) {
            $.ajax({
                url: `${BASE_URL}/relatedNews?cateId=${cateId}&subId=${subId}`,
                type: "GET",
                success: function (response) {
                    setRelatedNews(response);
                }, error: function (error) {
                    console.error("Lỗi khi lấy tin liên quan: ", error);
                },
            });
        }
    }, [cateId]);

    return (

        <Container className="text-center">
            {detail.map((item) => (<Row key={item.id}>
                <Col>
                    <Col className="d-flex justify-content-center"> {/* Căn giữa nội dung */}
                        <div className="cate text-left"> {/* Đảm bảo có lớp text-left ở đây */}
                            <div className="header">
                                <span>{item.name}</span> ---> <span style={{textTransform:'uppercase'}}>{item.namecon}</span>
                            </div>
                            <h2 className="article-title" style={{textAlign: 'left'}}>{item.titel}</h2>
                        </div>
                    </Col>
                    <div className="audio-player">
                        <TextToSpeech
                            text={`${item.content} ${item.contenta}${item.contentb}${item.contentc}${item.contentd}${item.contente}`}/>
                    </div>
                    <p >(Tin Tức) - {item.content}</p>
                    <p>{item.contenta}</p>
                    <Image
                        // src="../img/no-image.png"
                        src={item.img}
                        alt="" className="article-image"
                    />
                    <div>
                        {/*<p>{item.content}</p>*/}

                        <p>{item.contentb}</p>
                        <p>{item.contentc}</p>
                        <p>{item.contentd}</p>
                        <p>{item.contente}</p>
                    </div>

                    <div className="containernewss">
                        <div className="relatedCon">
                        <h2>Tin liên quan</h2>
                        {relatedNews.slice(0,3).map((news) => (
                            <Link to={`/detail/${news.id}`} onClick={() => HandleNewsClick(news.id)} className="his" style={{textDecoration: 'none'}}>
                        <div className="related-news" key={news.id}>
                            <img src={news.img}/>
                            <div className="text-content">
                                <h3 className="truncates" style={{textAlign: 'left'}}>{news.titel}</h3>
                                <p className="truncates">{news.content}</p>
                            </div>
                            <div className="clear"></div>
                        </div>
                                </Link>
                        ))}
                        </div>
                    </div>
                    <CommentSection postId={id}></CommentSection>
                </Col>
            </Row>))}


        </Container>


    );
}

export default Detail;
