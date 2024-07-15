import React, { useState, useEffect } from 'react';
import './style.css';
import logo from '../../../image/logo3.png';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getCurrentFormattedDate } from '../../../utils/dateUtils';
import { Wapper as PopperWrapper } from "./poper/Poper";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import SeachBox from "./seachbox/SeachBox";
import Image from "../../img/InImage";
import BASE_URL from "../../../database/Config"; // optional
import LoginModal from "../../login/LoginModal";

function Header() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(getCurrentFormattedDate());
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
    const [showLoginModal, setShowLoginModal] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token); // Update login status if token exists
        const timer = setInterval(() => {
            setCurrentDate(new Date());
            setCurrentDay(getCurrentFormattedDate());
        }, 1000 * 60 * 60 * 24);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove token from session storage
        setIsLoggedIn(false);
        window.location.reload(); // Refresh the page
        alert('Bạn đã đăng xuất.'); // Display logout message
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const homePath = "/home";
    const [searchTerm, setSeach] = useState('');
    const navigate = useNavigate();

    const handleSearchButtonClick = () => {
        navigate(`/seach?q=${searchTerm}`);
    };

    const handleLoginClick = () => {
        setShowLoginModal(true); // Show the login modal
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Update login status
        setShowLoginModal(false); // Hide the modal after successful login
        window.location.reload(); // Refresh the page
    };

    const history = () => {
        navigate("/historys");
        window.location.reload(); // Refresh the page
    };

    const [show, setShow] = useState(true);
    const handHide = () => {
        setShow(false);
    };

    const [searchTermAcc, setsearchTermAcc] = useState([]);
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setsearchTermAcc([]);
            return;
        }
        fetch(`${BASE_URL}/seach?q=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                setsearchTermAcc(data);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }, [searchTerm]);

    return (
        <header className="containerHeader">
            <div className="inner">
                <div className="logo">
                    <Link to={homePath}><Image src={logo} alt="Logo" /></Link>
                </div>
                <Tippy
                    interactive
                    visible={show && searchTerm.trim().length > 0 && searchTermAcc.length > 0}
                    render={attrs => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className="seach-box">
                                </h4>
                                {searchTermAcc.map((item) =>
                                    <SeachBox key={item.id} data={item} onClick={handHide}></SeachBox>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                    onClickOutside={handHide}>
                    <div className="seach">
                        <input
                            placeholder="Tìm Kiếm Tin Tức"
                            spellCheck="false"
                            value={searchTerm}
                            onChange={(e) => setSeach(e.target.value)}
                            onFocus={() => setShow(true)}
                        />
                        <button
                            className="clear"
                            onClick={() => setSeach('')}
                            style={{ display: searchTerm ? 'block' : 'none' }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <button className="seach-btn" onClick={() => { handleSearchButtonClick(); handHide(); }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className="status">
                    <div className="city">
                        <div className="city-content">
                            <Link to="" className="his" onClick={history}>
                                <h5>Lịch Sử Xem</h5>
                            </Link>
                            <div className="time">
                                <h5>{currentDay},</h5>
                                <h5>{formatDate(currentDate)}</h5>
                            </div>
                        </div>
                    </div>
                    <span className="thanh"></span>
                    <div className="history">
                        {!isLoggedIn && (
                            <>
                                <Button variant="outline-primary" onClick={handleLoginClick} style={{ marginLeft: '15px' }}>
                                    Login
                                </Button>
                                <LoginModal
                                    show={showLoginModal}
                                    handleClose={handleCloseModal}
                                    handleLoginSuccess={handleLoginSuccess}
                                />
                            </>
                        )}
                        {isLoggedIn && (
                            <Button variant="outline-primary" onClick={handleLogout} style={{ marginLeft: '15px' }}>
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
