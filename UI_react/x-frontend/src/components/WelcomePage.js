import React from 'react';
import './WelcomePage.css'; // Import the CSS from a separate file
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <img src="https://e0.pxfuel.com/wallpapers/517/24/desktop-wallpaper-pink-cat-beautiful-black-cats.jpg" alt="meowmeow" />

            <div className="content">
                <h1>Welcome to X-Clone</h1>
                <p>Join now</p>
                <button className="button" onClick={() => navigate('/signup')}>Register</button>
                <p>Have an account?</p>
                <button className="button" onClick={() => navigate('/signin')}>Login</button>
            </div>
        </div>
    );
}

export default WelcomePage;