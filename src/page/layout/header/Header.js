import './style.css'
import img from '../../../image/aaa.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
function Header(){
    return <header className="container">
        <div className="inner">
            <div className="logo">
                <img src={img}/>
            </div>
            <div className="seach">
                <input placeholder="Tìm Kiếm Tin Tức" spellCheck="false"/>
                <button className="clear">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <button className="seach-btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className="status">
                <div className="city">
                    <h5> Hồ Chí Minh</h5>
                    <h5> Hồ Chí Minh</h5>
                </div>
                <div className="nhietdo">
                    <h5> 30</h5>

                </div>


            </div>
        </div>
    </header>

}
export  default  Header;