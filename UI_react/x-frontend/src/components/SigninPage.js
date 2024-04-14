import React, { useState } from 'react';
import './SigninPage.css'; // Import the CSS from a separate file

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const userData = await response.json();
            console.log("Login successful, data:", userData);

            // Redirect to the main application page
            window.location.href = '/tweets'; // Replace with the correct page

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="logo-container">
                <img src="https://e0.pxfuel.com/wallpapers/517/24/desktop-wallpaper-pink-cat-beautiful-black-cats.jpg" alt="X-Clone Logo" />
            </div>

            <h2>Log in to X-Clone</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" id="username" name="username" placeholder="Email" required onChange={(e) => setUsername(e.target.value)} /><br /><br />

                <input type="password" id="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} /><br /><br />

                <button className="button">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;