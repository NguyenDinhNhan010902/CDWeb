import "./styleHome.css";
import React, {useState, useEffect} from "react";
import $ from "jquery";
import BASE_URL from "../../database/Config";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cart from "./components/Cart";
import CartNext from "./components/CartNext";
import HandleNewsClick from "../../utils/HandleNewsClick";

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
    const leftData = data.sort((a, b) => b.id - a.id).slice(1, 3);
    const rightData = data.sort((a, b) => b.id - a.id).slice(3, 8);
    const centerData = data.sort((a, b) => b.id - a.id).slice(0, 1);
    return (
        <div className="container">
            <div className="noibat"> Mới Nhất</div>
            <div className="home">
                <div className="left">
                    {leftData.map((item) => (
                        <div key={item.id}>
                            <Link to={`/detail/${item.id}`} onClick={() => HandleNewsClick(item.id)}>
                                <img src={item.img} alt="Logo" className="imgLeft"/>
                            </Link>
                            <Link to={`/detail/${item.id}`} onClick={() => HandleNewsClick(item.id)} className="titel">
                                <h3 className="titelLeft titelTruncates" style={{textAlign: 'left', width:'80%'}}>{item.titel} </h3>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="center">
                    {centerData.map((item) => (
                        <div key={item.id}>
                            <Link to={`/detail/${item.id}`} onClick={() => HandleNewsClick(item.id)}>
                                <img src={item.img} alt="Logo" className="imgCenter"/>
                            </Link>
                            <Link to={`/detail/${item.id}`} className="titel" onClick={() => HandleNewsClick(item.id)}>
                                <h3 className="titelCenter titelTruncates">{item.titel}</h3>
                            </Link>
                            <p className="truncates" style={{fontSize:'15px'}} >{item.content}</p>
                        </div>
                    ))}
                </div>
                <div className="right">
                    {rightData.map((item) => (
                        <div className="rightItem" key={item.id} onClick={() => HandleNewsClick(item.id)}>
                            <Link to={`/detail/${item.id}`} className="titelRight">
                                <h3 className="truncates">{item.titel}</h3>
                            </Link>
                            <Link to={`/detail/${item.id}`} className="titel" onClick={() => HandleNewsClick(item.id)}>
                                <img src={item.img} alt="" className="rightImage"/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="khuvuc"></div>

            <div className="noibat">Xã Hội</div>
            <Container className="newsContainer">
                <Row>
                    <Col sm={4}>
                        {data.sort((a, b) => b.id - a.id).slice(0, 2).map((item) => (
                            <div className="mainNews" key={item.id}>
                                <Link to={`/detail/${item.id}`} style={{textDecoration: 'none'}}
                                      onClick={() => HandleNewsClick(item.id)}>
                                    <img src={item.img} alt="Main News" className="mainImg"/>
                                    <h2 className="mainTitle titelTruncates"
                                        style={{textAlign: 'left', color: 'black'}}>{item.titel} </h2>
                                </Link>
                            </div>
                        ))}
                    </Col>
                    <Col sm={8}>
                        <Row> {data.sort((a, b) => b.id - a.id).slice(2, 6).map((item) => (
                            <Col sm={16} className="subNewsItem">
                                <Link to={`/detail/${item.id}`} style={{textDecoration: 'none'}}
                                      onClick={() => HandleNewsClick(item.id)}>
                                    <img
                                        src={item.img}
                                        alt="Sub News 1"
                                        className="subImg"
                                        style={{
                                            width: '200px',
                                            height: '150px',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                </Link>
                                <div style={{marginLeft: '20px', textAlign: 'left'}}>
                                    <Link to={`/detail/${item.id}`} style={{textDecoration: 'none'}}
                                          onClick={() => HandleNewsClick(item.id)}>
                                        <h4 className="titelTruncates" style={{marginLeft: '20', textAlign: 'left',color:'black'}}>{item.titel} </h4>
                                    </Link>

                                    <p className="truncates" style={{fontSize:'15px'}}> {item.content}</p>
                                </div>

                            </Col>))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <div className="noibat"> Chính Trị</div>
            <Cart></Cart>
            <div className="noibat"> Thể Thao</div>
            <div className="cardnext">

                <CartNext></CartNext>
            </div>

        </div>
    );
}

export default Home;
