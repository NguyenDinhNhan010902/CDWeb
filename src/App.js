import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './page/home/Home';
import { publicRouter } from './Router/Router';
import  Layout  from "./page/layout/Layout";

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRouter.map((route,index) => {
                    const Layouts = route.layout || Layout;
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Layouts> <Page/> </Layouts>}/>
                })}
            </Routes>
        </div>

    );
}

export default App;