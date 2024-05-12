import "./styleHome.css"
import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import axios from 'axios';
import BASE_URL from '../../database/Config';
import logo from "../../image/logo3.png";
import {Link} from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const detailPath = "/detail"
    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detail`, // Sử dụng ký tự backtick và `${}` để sử dụng biến BASE_URL
            type: 'GET',
            success: function(response) {
                setData(response);
            },
            error: function(error) {
                console.error('Error fetching drtail: ', error);
            }
        });
    }, []);
    return <div className="container">
        <div className="home">
            <div className="left">
                {data.map(item => (
                    <div key={item.id}>
                        <Link to={detailPath}>
                            <img src={item.img} alt="Logo" className="imgLeft"/>
                        </Link>
                        <Link to={detailPath}>
                            <h3 className="titelLeft">{item.content}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="center">
                {data.map(item => (
                    <div key={item.id}>
                        <Link to={detailPath}>
                            <img src={item.img} alt="Logo" className="imgCenter"/>
                        </Link>
                        <Link to={detailPath}>
                            <h3 className="titelCenter">{item.content}</h3>
                        </Link>
                        <p>noi dung</p>
                    </div>

                ))}

            </div>
            <div className="right">
                {data.map(item => (
                    <div className="rightItem" key={item.id}>
                        <Link to="{detailPath}">
                            <h3>{item.content}</h3>
                        </Link>
                        <Link to={detailPath}>
                            <img src={item.img} alt="Logo"/>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
        <div className="khuvuc"></div>

    </div>
}

export default Home