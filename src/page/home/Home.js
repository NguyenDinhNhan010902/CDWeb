import "./styleHome.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "./logo2.png";
import { Link } from 'react-router-dom';

function Home(){
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/detail')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return <div className="container">
        <div className="left">
            {data.map(item => (
                <div key={item.id}>
                    <Link to="/path">
                        <img src={item.img} alt="Logo" />
                    </Link>
                    <Link to="/path">
                        <h3>{item.content}</h3>
                    </Link>
                </div>
            ))}
        </div>
        <div className="center">
            <Link  to="/path"><img src="./logo2.png"/></Link>
            <Link to="/path"><h3>Tiêu Đề</h3> </Link>
        </div>
        <div className="right">
            <Link  to="/path"><img src={logo}/></Link>
            <Link to="/path"><h3>Tiêu Đề</h3> </Link>
        </div>
    </div>
}
export default Home