import React, {useState, useEffect} from 'react';
import './style.css';
import logo from '../../../image/logo3.png';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {getCurrentFormattedDate} from '../../../utils/dateUtils';
import {Wapper as PopperWrapper} from "./poper/Poper";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import {Popper} from "@mui/material";
import SeachBox from "./seachbox/SeachBox";
import Image from "../../img/InImage";
import $ from "jquery";
import BASE_URL from "../../../database/Config"; // optional
function Header() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(getCurrentFormattedDate());
    const [isLoggedIn,  setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const [seachAcc, setSeachAcc] = useState([]);
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user');
        setIsLoggedIn(isLoggedIn);
        const timer = setInterval(() => {
            setCurrentDate(new Date());
            setCurrentDay(getCurrentFormattedDate());
        }, 1000 * 60 * 60 * 24);
        return () => clearInterval(timer);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        alert('Bạn đã đăng xuất.');
    };
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
    const OnclickLogin = () => {
        navigate((`/login`));
    }
    const [show, setShow] = useState(true);
    const handHide =()=>{
        setShow(false);
    }
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
                    <Link to={homePath}><Image src={logo} alt="Logo"/></Link>
                </div>
                <Tippy
                    interactive
                    visible={show && searchTerm.trim().length > 0 && searchTermAcc.length > 0  }
                    render={attrs => (
                            <div className="box" tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                <h4 className="seach-box">
                                </h4>
                                    {searchTermAcc.map((item) =>
                                    <SeachBox key={item.id} data ={item} onClick={handHide}></SeachBox>
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
                            onFocus={()=>setShow(true)}
                        />
                        <button
                            className="clear"
                            onClick={() => setSeach('')}
                            style={{ display: searchTerm ? 'block' : 'none' }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                        <button className="seach-btn" onClick={() => {handleSearchButtonClick(); handHide();}}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </Tippy>
                <div className="status">
                    <div className="city">
                        <h5> {currentDay}</h5>
                        <h5>{formatDate(currentDate)}</h5>
                    </div>
                    <span className="thanh"></span>
                    <div className="history">
                        {/*{isLoggedIn && (*/}
                        {/*// <p> Lịch Sử Xem</p>*/}
                        {/*)}*/}
                        {/*{isLoggedIn && (*/}
                        {/*    <Button variant="outline-primary" onClick={handleLogout} style={{marginLeft: '15px'}}>*/}
                        {/*        Logout*/}
                        {/*    </Button>*/}

                        {/*)}*/}
                        {/*{!isLoggedIn && (*/}
                        {/*    <Button variant="outline-primary" onClick={OnclickLogin} style={{marginLeft: '15px'}}>*/}
                        {/*        Login*/}
                        {/*    </Button>*/}
                        {/*)}*/}
                        {!isLoggedIn&& (
                            <Button variant="outline-primary" onClick={OnclickLogin} style={{marginLeft: '15px'}}>
                                login
                            </Button>
                        )}
                        {isLoggedIn && (
                            <Button variant="outline-primary" onClick={handleLogout} style={{marginLeft: '15px'}}>
                                logout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
