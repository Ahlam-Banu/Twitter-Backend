import React, { useState } from 'react';
import './SignupPage.css'; // Import the CSS from a separate file
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            username,
            fullname,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            // When the signup is successful, navigate to the SigninPage
            navigate('/SigninPage');

        } catch (error) {
            console.error('Signup error:', error);
            // Display error message to the user
        }
    };

    return (
        <div className="form-container">
            <div className="logo-container">
                <img src="https://e0.pxfuel.com/wallpapers/517/24/desktop-wallpaper-pink-cat-beautiful-black-cats.jpg" alt="X-Clone Logo" />
            </div>

            <h2>Create your account</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" id="username" name="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} /><br /><br />

                <input type="text" id="fullname" name="fullname" placeholder="Fullname" required onChange={(e) => setFullname(e.target.value)} /><br /><br />

                <input type="email" id="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} /><br /><br />

                <input type="password" id="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} /><br /><br />

                <button className="button">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;