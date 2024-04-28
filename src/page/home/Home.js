import "./styleHome.css"
import logo from "../../image/logo2.png";
import { Link } from 'react-router-dom';

function Home(){
    return <div className="container">
        <div className="left">
            <Link  to="/path"><img src={logo}/></Link>
            <Link to="/path"><h3>Tiêu Đề</h3> </Link>
        </div>
        <div className="center">
            <Link  to="/path"><img src={logo}/></Link>
            <Link to="/path"><h3>Tiêu Đề</h3> </Link>
        </div>
        <div className="right">
            <Link  to="/path"><img src={logo}/></Link>
            <Link to="/path"><h3>Tiêu Đề</h3> </Link>
        </div>
    </div>
}
export default Home