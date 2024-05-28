import React, { useState, useEffect } from 'react';
import './style.css';
import logo from '../../../image/logo3.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getCurrentFormattedDate } from '../../../utils/dateUtils';

function Header() {
    const navigate = useNavigate();

    // State to hold the current date
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(getCurrentFormattedDate());

    // Update the date state every day at midnight
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
            setCurrentDay(getCurrentFormattedDate());
        }, 1000 * 60 * 60 * 24); // Update every 24 hours

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, []);

    // Format the date as DD/MM/YYYY
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSearchButtonClick = () => {
        navigate('/search');
    };

    const homePath = "/home";

    return (
        <header className="containerHeader">
            <div className="inner">
                <div className="logo">
                    <Link to={homePath}><img src={logo} alt="Logo" /></Link>
                </div>
                <div className="seach">
                    <input placeholder="Tìm Kiếm Tin Tức" spellCheck="false" />
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
                    <div className="nhietdo">
                        <h5> 30°C</h5>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
