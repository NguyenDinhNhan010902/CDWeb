import React, { useState, useEffect } from 'react';
import './style.css';
import logo from '../../../image/logo3.png';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getCurrentFormattedDate } from '../../../utils/dateUtils';


function Header() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(getCurrentFormattedDate());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
            setCurrentDay(getCurrentFormattedDate());
        }, 1000 * 60 * 60 * 24);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const homePath = "/home";
    const [searchTerm, setSeach] = useState('');
    const navigate = useNavigate();

    const handleSearchButtonClick = () => {
        navigate(`/seach?q=${searchTerm}`);
    };

    return (
        <header className="containerHeader">
            <div className="inner">
                <div className="logo">
                    <Link to={homePath}><img src={logo} alt="Logo" /></Link>
                </div>
                <div className="seach">
                    <input
                        placeholder="Tìm Kiếm Tin Tức"
                        spellCheck="false"
                        value={searchTerm}
                        onChange={(e) => setSeach(e.target.value)} />
                    <button className="clear">
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <button className="seach-btn" onClick={handleSearchButtonClick}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className="status">
                    <div className="city">
                        <h5> {currentDay}</h5>
                        <h5>{formatDate(currentDate)}</h5>
                    </div>
                    <span className="thanh"></span>
                    <div className="history">
                        <Link to="/historys"> <h5> Lịch Sử Xem</h5></Link>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
