
import { Routes, Route } from "react-router-dom";
import { publicRouter} from './Router/Router';
import Layout from "./page/layout/Layout";
import React, { useEffect, useState } from "react";
// import ProtectedRoute from "./Router/ProtectedRoute";
import ScrollToTop from './Router/ScrollToTop'
import {Switch} from "@mui/material";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);
    return (

            <div className="App">
                <div> <ScrollToTop /></div>
                <Routes>
                    {publicRouter.map((route, index) => {
                        const Layouts = route.layout || Layout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Layouts><Page /></Layouts>}
                            />
                        );
                    })}


                </Routes>
            </div>
    );
}

export default App;
