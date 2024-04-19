import Header from "./header/Header";
import Category from "./danhmuc/Category";
function Layout({children}){
    return (
        <div>
            <Header/>
            <Category/>
           <div className='context'>{children} </div>

        </div>

    )
}
export default Layout;