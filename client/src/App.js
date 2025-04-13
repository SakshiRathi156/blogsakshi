import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './homepage';
import AboutPage from './aboutpage';
import BlogPage from './blogpage';
import BlogContent from './content';
import CreateBlog from './createblog';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <ul>
                        <li><Link to="/blogs">HOME</Link></li>
                        <li><Link to="/blogs">BLOG</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                    </ul>
                </nav>

                <main className="main-content">
                    <Routes>
                        {/* Redirect root to /home */}
                        <Route path="/" element={<Navigate to="/home" replace />} />

                        {/* Define all routes */}
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/blogs" element={<BlogPage />} />
                        <Route path="/blog/:id" element={<BlogContent />} />
                        <Route path="/create" element={<CreateBlog />} />

                        {/* 404 Route */}
                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </main>

                <footer className="footer">
                    <p>Your Cozy Corner © {new Date().getFullYear()} | All rights reserved</p>
                </footer>
            </div>
        </Router>
    )
}

export default App;
