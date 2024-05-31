import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/news');
                setNews(response.data.articles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <Router>
            <div className="app">
                <Header />
                <NavBar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<NewsList />} />
                        <Route path="/world" element={<NewsList />} />
                        <Route path="/business" element={<NewsList />} />
                        <Route path="/technology" element={<NewsList />} />
                        <Route path="/sports" element={<NewsList />} />
                        <Route path="/entertainment" element={<NewsList />} />
                        <Route path="/news/:id" element={<NewsDetail />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;