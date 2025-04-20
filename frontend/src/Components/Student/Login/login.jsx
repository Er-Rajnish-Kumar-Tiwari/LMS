import React, {useContext,useState } from 'react';
import "../Login/login.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
import { assets } from '../../../assets/assets';

const Login = ({ setShowLogin }) => {

    const {token, setToken} = useContext(AppContext);
    const [currentState, setCurrentState] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);  

    const onLogin = async (event) => {
        event.preventDefault();

        
        if (currentState === 'Sign Up' && !name) {
            toast.warning("Please enter your name!");
            return;
        }

        if (!email || !password) {
            toast.warning("Please fill all fields!");
            return;
        }        
    };


    return (
        <div className='login'>
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2 className='text-2xl font-bold text-gray-600 '>{currentState} in Tanish LMS</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="Close" />
                </div>

                <div className="login-inputs">
                    {currentState === "Sign Up" && (
                        <input 
                            type='text' 
                            className='text-sm'
                            name='name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder='Enter your name' 
                            required
                        />
                    )}
                    <input 
                        type='email' 
                        name='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder='Enter your email' 
                            className='text-sm'
                        required
                    />
                    <input 
                        type='password' 
                        name='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Enter your password' 
                            className='text-sm'
                        required
                    />
                </div>

                <button type='submit'>
                    {currentState === "Sign Up" ? "Create account" : "Login"}
                </button>

                <div className="login-conditions">
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>

                <div>
                    {currentState === "Login" ? (
                        <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
