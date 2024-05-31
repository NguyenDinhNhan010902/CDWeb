import Header from "./header/Header";
import Category from "./danhmuc/Category";
import Footer  from "./Footer/Footer";
function Layout({children}){
    return (
        <div>
            <Header/>
            <Category/>
           <div className='context'>{children} </div>
            <Footer/>

        </div>

    )
}
export default Layout;