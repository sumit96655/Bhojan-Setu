// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { post } from '../services/ApiEndpoint'
// import  { toast } from 'react-hot-toast';
// import {useDispatch,useSelector } from 'react-redux'
// import { SetUser } from '../redux/AuthSlice';
// export default function Login() {
//  const user=useSelector((state)=>state.Auth)
// //  console.log(user)
//    const dispatch=useDispatch()
//     const [email,setEmail]=useState('')
//     const navigate=useNavigate()
//     const [password,setPassword]=useState('')

//        const handleSubmit= async(e)=>{
//         e.preventDefault();
//           // console.log(email,password)
//           try {
//               const request= await post('/api/auth/login',{email,password})
//               const reponse= request.data 

//               if (request.status==200) {
//                 if (reponse.user.role =='admin') {
//                   navigate('/admin')
//                 }else if (reponse.user.role =='user') {
//                    navigate('/')
//                 }
//                 toast.success(reponse.message)
//                 dispatch(SetUser(reponse.user))
//               }
//               // console.log(reponse)
//           } catch (error) {
//             console.log(error)
//           }
//        }
//   return (
//     <>

//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className='input-group'>
//                     <label htmlFor="Email">Email</label>
//                     <input type="email" name="" id="email" 
//                         onChange={(e)=>setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div className='input-group'>
//                     <label htmlFor="passowrd">Password</label>
//                     <input type="password" name=""
//                       onChange={(e)=>setPassword(e.target.value)} id="password" />
//                 </div>
//                 <button type='submit'>Login</button>
//                 <p className='register-link'>
//                 Not registered? <Link to={'/register'}>Register here</Link>
//                 </p>
//             </form>
//         </div>




//     </>
//   )
// }
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { User, Lock, Loader2, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const user = useSelector((state) => state.Auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsg('');
        
        try {
            const request = await post('/api/auth/login', { email, password });
            const response = request.data;

            if (request.status === 200) {
                if (response.user.role === 'admin') {
                    navigate('/admin/adminDashboard');
                } else if (response.user.role === 'user') {
                    navigate('/');
                }
                toast.success(response.message);
                dispatch(SetUser(response.user));
            }
        } catch (error) {
            setErrMsg('Login Failed. Please check your credentials.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="relative">
                {/* Background decorators */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                
                {/* Main card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700"
                >
                    {/* Decorative SVG */}
                    <div className="absolute top-0 right-0 w-32 h-32">
                        <svg viewBox="0 0 100 100" className="opacity-20">
                            <circle cx="75" cy="25" r="20" className="fill-blue-500" />
                            <path d="M 0 100 L 100 0" stroke="currentColor" className="stroke-purple-500" strokeWidth="0.5" />
                            <path d="M 20 80 L 80 20" stroke="currentColor" className="stroke-blue-500" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold mb-8 text-white text-center">Login</h2>

                    {errMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg"
                        >
                            <p className="text-red-500 text-center text-sm" aria-live="assertive">
                                {errMsg}
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-gray-300 block text-sm font-medium">
                                Email
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-gray-300 block text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-2 px-4 hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>Sign In</span>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Not registered?{' '}
                            <Link 
                                to="/register" 
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;