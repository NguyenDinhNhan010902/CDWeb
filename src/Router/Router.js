import Home from "../page/home/Home";
import Detail from "../page/detail/Detail";
import Seach from "../page/seach/Seach";
import ListCategory from "../page/layout/danhmuc/listCategory/ListCategory";
import Historys from "../page/layout/header/history/Historys";


const publicRouter = [
    {path: '/home',component: Home},
    {path: '/',component: Home},
    {path: '/detail',component: Detail},
    {path: '/seach',component: Seach},
    {path: '/listcategory',component: ListCategory},
    {path: '/historys',component: Historys},

];
export {publicRouter}