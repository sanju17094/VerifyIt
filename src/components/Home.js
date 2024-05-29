// src/HomePage.js
import React from 'react';
import './Home.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <main>
                <section className="home">
                    <h2>Welcome to VerifyIt!</h2>
                    <div className="home-content">
                        <p>Your go-to platform for verification and authentication services. We ensure accuracy and reliability in all your important documents and data.</p>
                    </div>
                    <div className="buttons">
                        <button className="btn1">Get Started</button>
                        <button className="btn2">Contact Us</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
