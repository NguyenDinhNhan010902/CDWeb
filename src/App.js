
import { Routes, Route } from "react-router-dom";
import { publicRouter} from './Router/Router';
import Layout from "./page/layout/Layout";
import React, { useEffect, useState } from "react";
// import ProtectedRoute from "./Router/ProtectedRoute";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);
    return (
            <div className="App">
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

                    {/*{protectedRouter.map((route, index) => {*/}
                    {/*    const Layouts = route.layout || Layout;*/}
                    {/*    const Page = route.component;*/}
                    {/*    return (*/}
                    {/*        <Route*/}
                    {/*            key={index}*/}
                    {/*            path={route.path}*/}
                    {/*            element={*/}
                    {/*                <ProtectedRoute>*/}
                    {/*                    <Layouts><Page /></Layouts>*/}
                    {/*                </ProtectedRoute>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    );*/}
                    {/*})}*/}
                </Routes>
            </div>
    );
}

export default App;
