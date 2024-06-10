import Header from "./header/Header";
import Category from "./danhmuc/Category";
import Footer  from "./Footer/Footer";
// import Casss from "./danhmuc/Casss";
function Layout({children}){
    return (
        <div>
            <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
                <Header/>
                <Category/>
            </div>
            {/*<Casss/>*/}
           <div className='context'>{children} </div>
            <Footer/>

        </div>

    )
}
export default Layout;