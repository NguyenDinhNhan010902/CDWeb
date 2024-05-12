import Home from "../page/home/Home";
import Detail from "../page/detail/Detail";
import Category from "../page/layout/danhmuc/Category";
import Seach from "../page/seach/Seach";

const publicRouter = [
    {path: '/home',component: Home},
    {path: '/',component: Home},
    {path: '/detail',component: Detail},
    {path: '/seach',component: Seach},
];
export {publicRouter}