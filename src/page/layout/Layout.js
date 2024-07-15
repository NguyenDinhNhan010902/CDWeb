import Header from "./header/Header";
import Category from "./danhmuc/Category";
import Footer  from "./Footer/Footer";
// import Casss from "./danhmuc/Casss";
import './header/style.css'
function Layout({children}){

    return (
        <div>
            <div className= "sticky-container">
                    <Header />
                    <Category  />
            </div>
            {/*<Casss/>*/}
           <div className='context'>{children} </div>
            <Footer/>

        </div>

    )
}
export default Layout;