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

        const obj = { name, email, password };
        let url = "";

        if (currentState === 'Login') {
            url = "https://lms-backend-sgs2.onrender.com/login";
        } else {
            url = "https://lms-backend-sgs2.onrender.com/register";
        }

        try {
            const response = await axios.post(url, obj);

            if (response.data && response.data.token) {
                setData([...data, obj]); 
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                
                toast.success("Successfully logged in!");
                setShowLogin(false);  
            } else {

                if(response.data.Massage==="User does not exits"){
                    toast.error("User does not exits. please sign up!");
                }
                
                else if(response.data.Massage==="please enter strong password"){
                    toast.error("Enter strong password!");
                }

                else if(response.data.Massage==="Invaild password"){
                    toast.error("Invaild password. try again!");
                }

                else if(response.data.Massage==="This account already exits"){
                    toast.error(" User already exits. please login!");
                }
                
                else{
                    toast.error("Login faild please try again!");
                }


            }
        } catch (error) {
            toast.error(`Error in API call: ${error.message}`);
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
