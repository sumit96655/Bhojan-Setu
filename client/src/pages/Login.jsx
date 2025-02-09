// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { post } from '../services/ApiEndpoint';
// import { toast } from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { SetUser } from '../redux/AuthSlice';
// import { User, Lock } from 'lucide-react';

// export default function Login() {
//     const dispatch = useDispatch();
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const request = await post('/api/auth/login', { email, password });
//             const response = request.data;

//             if (request.status === 200) {
//                 if (response.user.role === 'admin') {
//                     navigate('/admin');
//                 } else if (response.user.role === 'user') {
//                     navigate('/');
//                 }
//                 toast.success(response.message);
//                 dispatch(SetUser(response.user));
//             }
//         } catch (error) {
//             toast.error('Invalid credentials');
//             console.log(error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     Welcome Back
//                 </h2>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                     Sign in to your account
//                 </p>
//             </div>

//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10">
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email
//                             </label>
//                             <div className="mt-1 relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <User className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
//                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                                     placeholder="Enter your email"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <div className="mt-1 relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="password"
//                                     type="password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
//                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                                     placeholder="Enter your password"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
//                                 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600
//                                 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
//                                 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200
//                                 shadow-sm"
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </form>

//                     <div className="mt-6">
//                         <div className="relative">
//                             <div className="relative flex justify-center text-sm">
//                                 <span className="px-2 text-gray-600">
//                                     Not registered yet?{' '}
//                                     <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
//                                         Create an account
//                                     </Link>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { User, Lock, Sparkles } from 'lucide-react';

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isHovering, setIsHovering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await post('/api/auth/login', { email, password });
            const response = request.data;

            if (request.status === 200) {
                if (response.user.role === 'admin') {
                    navigate('/admin');
                } else if (response.user.role === 'user') {
                    navigate('/');
                }
                toast.success(response.message);
                dispatch(SetUser(response.user));
            }
        } catch (error) {
            toast.error('Invalid credentials');
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700" />
                <div className="absolute top-40 right-40 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-6">
                    <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
                </div>
                <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-lg text-gray-600">
                    We're so happy to see you again ✨
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-xl rounded-2xl sm:px-10 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 relative group">
                           
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                                    transition-all duration-200 hover:border-purple-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative group">
                              
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                                    transition-all duration-200 hover:border-purple-200"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl
                                text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-pink-400
                                hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-purple-400 transition-all duration-300
                                shadow-lg hover:shadow-xl"
                            >
                                Sign in
                                {isHovering && <Sparkles className="h-4 w-4 animate-spin" />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-gray-600">
                                    Not registered yet?{' '}
                                    <Link to="/register" className="font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200">
                                        Create an account
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}