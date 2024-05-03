import "./styleHome.css"
import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import axios from 'axios';
import BASE_URL from '../../database/Config';
import logo from "../../image/logo3.png";
import {Link} from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
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
                        <Link to="/path">
                            <img src={item.img} alt="Logo"/>
                        </Link>
                        <Link to="/path">
                            <h3>{item.content}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="center">
                {data.map(item => (
                    <div key={item.id}>
                        <Link to="/path">
                            <img src={item.img} alt="Logo"/>
                        </Link>
                        <Link to="/path">
                            <h3>{item.content}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="right">
                {data.map(item => (
                    <div key={item.id}>
                        <Link to="/path">
                            <img src={item.img} alt="Logo"/>
                        </Link>
                        <Link to="/path">
                            <h3>{item.content}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        <div className="khuvuc"></div>

    </div>
}

export default Home