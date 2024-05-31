import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './detail.css';
import $ from "jquery";
import BASE_URL from "../../database/Config"; // Make sure you have your CSS file
import CommentSection from './comment/CommentSection';

function Detail() {
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detail`,
            type: "GET",
            success: function (response) {
                setDetail(response);
            },
            error: function (error) {
                console.error("Error fetching detail: ", error);
            },
        });
    }, []);
    return (
        <Container className="text-center"> {/* Add text-center class here */}
            <Row>

                <Col>
                    <Col className="d-flex justify-content-center"> {/* Center the content */}
                        <div className="cate text-left"> {/* Ensure text-left class here */}
                            <p>Xã Hội</p>
                            <h2 className="article-title">Luật pháp "hậu Gateway" và sự tắc trách của người cầm lái</h2>
                        </div>
                    </Col>
                    <div className="audio-player">
                        <audio controls>
                            <source src="your-audio-source.mp3" type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                        <span>Nam miền Bắc</span>
                    </div>
                    <p>(Dân trí) - Sau vụ "em bé Gateway", quy định pháp luật về đưa đón học sinh đã được bổ sung để
                        phòng ngừa bi kịch. Điều đáng buồn, bi kịch vẫn tái diễn.</p>
                    <img
                        src="https://cdnphoto.dantri.com.vn/V8cCQYSCBadiYxk9mwBSYSPu1p4=/zoom/240_160/2024/05/31/trumpafp-crop-1717109561820.jpeg"
                        alt="Trường mầm non" className="article-image"/>
                    {detail.slice(0, 2).map((item)=>(
                    <p>
                        {item.content}
                    </p>
                    ))}
                </Col>
                <CommentSection /> {/* Add CommentSection here */}

            </Row>

        </Container>
    );
}

export default Detail;
