import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getLogin, setCurrentUser } from '../../../API/UserApi';


interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async () => {
      console.log('Attempting login with username:', email, 'and password:', password);
  
      // Check if the entered username exists in the Users object and if the password matches
      if (await getLogin(email, password)) {
        console.log('Login successful');
        // Call onLoginSuccess if credentials match
        onLoginSuccess();
        setCurrentUser(email); // Update the currentUser variable with the logged-in username
        navigate("/home");
      } else {
        console.log('Login failed');
        // Set error message if credentials don't match
        setError('Invalid username or password');
      }
    };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username" 
            value={email} 
            onChange={(e) => setemail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="button" className='submit' onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;