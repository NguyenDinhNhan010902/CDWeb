import './style.css'
import logo from '../../../image/logo3.png'
import { useNavigate  } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Header(){
    const navigate = useNavigate ();
    const handleSearchButtonClick = () => {
        // Chuyển hướng đến trang "/search" khi nút tìm kiếm được nhấn
        navigate('/seach');
    };
    const homePath = "/home"
    return <header className="containerHeader">
                <div className="inner">
                    <div className="logo">
                        <Link to={homePath}><img src={logo}/></Link>
                    </div>
                    <div className="seach">
                        <input placeholder="Tìm Kiếm Tin Tức" spellCheck="false"/>
                        <button className="clear">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <button className="seach-btn" onClick={handleSearchButtonClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className="status">
                        <div className="city">
                            <h5> Hồ Chí Minh</h5>
                            <h5> Hồ Chí Minh</h5>
                        </div>
                        <span className="thanh"></span>
                        <div className="nhietdo">
                            <h5> 30</h5>
                        </div>
                    </div>
                </div>
    </header>

}
export  default  Header;