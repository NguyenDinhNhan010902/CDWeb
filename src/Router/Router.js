import Home from "../page/home/Home";
import Detail from "../page/detail/Detail";
import Seach from "../page/seach/Seach";
import ListCategory from "../page/layout/danhmuc/listCategory/ListCategory";
import Historys from "../page/layout/header/history/Historys";
import Login from "../page/login/Login";

const publicRouter = [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/', component: Home },
    { path: '/detail/:id', component: Detail },
    { path: '/seach', component: Seach },
    { path: '/listcategory/:id', component: ListCategory },
    { path: '/listcategory/:id/:subid', component: ListCategory },
    { path: '/historys', component: Historys },
];
//các trang sau khi đăng nhập mới đc dùng nhớ thêm export
// const protectedRouter = [
//     // { path: '/home', component: Home },
//     // { path: '/', component: Home },
//     // { path: '/detail/:id', component: Detail },
//     // { path: '/seach', component: Seach },
//     // { path: '/listcategory/:id', component: ListCategory },
//     // { path: '/listcategory/:id/:subid', component: ListCategory },
//     // { path: '/historys', component: Historys },
// ];

export { publicRouter  };
