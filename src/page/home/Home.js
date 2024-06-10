import "./styleHome.css";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import BASE_URL from "../../database/Config";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cart from "./components/Cart";
import CartNext from "./components/CartNext";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detail`,
            type: "GET",
            success: function (response) {
                setData(response);
            },
            error: function (error) {
                console.error("Error fetching detail: ", error);
            },
        });
    }, []);
    const leftData = data.filter(item => item.cateId === 1).slice(0,2);
    const rightData = data.filter(item => item.cateId === 3).slice(0, 4);
    const centerData = data.filter(item => item.cateId === 2).slice(0,1);
    return (
        <div className="container">
            <div className="home">
                <div className="left">
                    {leftData.map((item) => (
                        <div key={item.id}>
                            <Link to={`/detail/${item.id}`}>
                                <img src={item.img} alt="Logo" className="imgLeft" />
                            </Link>
                            <Link to={`/detail/${item.id}`} className="titel">
                                <h3 className="titelLeft">{item.titel}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="center">
                    {centerData.map((item) => (
                        <div key={item.id}>
                            <Link to={`/detail/${item.id}`}>
                                <img src={item.img} alt="Logo" className="imgCenter" />
                            </Link>
                            <Link to={`/detail/${item.id}`} className="titel">
                                <h3 className="titelCenter">{item.titel}</h3>
                            </Link>
                            <p className="truncate">{item.content}</p>
                        </div>
                    ))}
                </div>
                <div className="right">
                    {rightData.map((item) => (
                        <div className="rightItem" key={item.id}>
                            <Link to={`/detail/${item.id}`} className="titelRight">
                                <h3>{item.titel}</h3>
                            </Link>
                            <Link to={`/detail/${item.id}`} className="titel">
                                <img src={item.img} alt="Logo" className="imgRight"/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="khuvuc"></div>
            <Container className="newsContainer">
                <Row>
                    <Col sm={4}>
                        {data.slice(0, 2).map((item) =>(
                        <div className="mainNews" key={item.id}>
                            <Link to="">
                                <img src={item.img} alt="Main News" className="mainImg" />
                            </Link>
                            <h2 className="mainTitle">Chi chít nhà, cột điện giữa công trường Vành đai 3 TPHCM đoạn qua Đồng Nai</h2>
                        </div>
                                ))}
                    </Col>
                    <Col sm={8}>
                        <Row> {data.slice(0, 4).map((item) =>(
                            <Col sm={16} className="subNewsItem">
                                <Link to="">
                                <img src="https://cdnphoto.dantri.com.vn/V8cCQYSCBadiYxk9mwBSYSPu1p4=/zoom/240_160/2024/05/31/trumpafp-crop-1717109561820.jpeg" alt="Sub News 1" className="subImg" />
                                </Link>
                                <Link to="" className="subTitle" >
                                <h4  >Vụ học sinh tử vong vì bị bỏ quên: Các đối tượng có thể chịu án phạt nào?</h4>
                                </Link>
                            </Col>))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Cart></Cart>
            <div className="cardnext">
            <CartNext ></CartNext>
            </div>

        </div>
    );
}

export default Home;
