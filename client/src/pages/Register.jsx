// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { post } from '../services/ApiEndpoint';
// import { toast } from 'react-hot-toast';

// export default function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     contact: '',
//     role: '',
//     address: '',
//     donorType: '',
//     latitude: '',
//     longitude: ''
//   });

//   const [errors, setErrors] = useState({});

//   // Get user's location on component mount
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         setFormData(prev => ({
//           ...prev,
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         }));
//       });
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Required fields validation
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.password.trim()) newErrors.password = 'Password is required';
//     if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
//     if (!formData.role) newErrors.role = 'Role is required';

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     // Contact validation
//     const contactRegex = /^\d{10}$/;
//     if (formData.contact && !contactRegex.test(formData.contact)) {
//       newErrors.contact = 'Contact should be 10 digits';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fill all required fields correctly');
//       return;
//     }

//     try {
//       const response = await post('/api/auth/register', formData);
//       if (response.status === 200) {
//         toast.success('Registration successful!');
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
//                 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
//               />
//               {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} 
//                 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} 
//                 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
//               />
//               {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//             </div>

//             {/* Contact Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Contact <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border ${errors.contact ? 'border-red-500' : 'border-gray-300'} 
//                 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
//               />
//               {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Role <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} 
//                 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
//               >
//                 <option value="">Select Role</option>
//                 <option value="user">User</option>
//                 <option value="donor">Donor</option>
//                 <option value="ngo">NGO</option>
//                 <option value="volunteer">Volunteer</option>
//               </select>
//               {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
//             </div>

//             {/* Donor Type - Only shown if role is donor */}
//             {formData.role === 'donor' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Donor Type
//                 </label>
//                 <select
//                   name="donorType"
//                   value={formData.donorType}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 
//                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="">Select Donor Type</option>
//                   <option value="individual">Individual</option>
//                   <option value="restaurant">Restaurant</option>
//                   <option value="hotel">Hotel</option>
//                   <option value="corporate">Corporate</option>
//                 </select>
//               </div>
//             )}

//             {/* Address Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows="3"
//                 className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 
//                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm 
//                 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 
//                 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 
//                 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
//               >
//                 Register
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 text-gray-600">
//                   Already have an account?{' '}
//                   <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
//                     Login here
//                   </Link>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Phone, MapPin, Building, Sparkles } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    role: '',
    address: '',
    donorType: '',
    latitude: '',
    longitude: ''
  });

  const [errors, setErrors] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!formData.role) newErrors.role = 'Role is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const contactRegex = /^\d{10}$/;
    if (formData.contact && !contactRegex.test(formData.contact)) {
      newErrors.contact = 'Contact should be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      const response = await post('/api/auth/register', formData);
      if (response.status === 200) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
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

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
        </div>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Join Our Community
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
          Start making a difference today ✨
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
        <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-xl rounded-2xl sm:px-10 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition-all duration-200 hover:border-purple-200`}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition-all duration-200 hover:border-purple-200`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition-all duration-200 hover:border-purple-200`}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Contact Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Contact <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                </div>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 rounded-xl border ${errors.contact ? 'border-red-500' : 'border-gray-200'} 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition-all duration-200 hover:border-purple-200`}
                />
              </div>
              {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
            </div>

            {/* Role Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 rounded-xl border ${errors.role ? 'border-red-500' : 'border-gray-200'} 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition-all duration-200 hover:border-purple-200`}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>

            {/* Donor Type - Only shown if role is donor */}
            {formData.role === 'donor' && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Donor Type
                </label>
                <div className="mt-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                  </div>
                  <select
                    name="donorType"
                    value={formData.donorType}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                    transition-all duration-200 hover:border-purple-200"
                  >
                    <option value="">Select Donor Type</option>
                    <option value="individual">Individual</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hotel</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              </div>
            )}

            {/* Address Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1 relative group">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <MapPin className="h-5 w-5 text-purple-400 transition-colors duration-200 group-hover:text-purple-500" />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition-all duration-200 hover:border-purple-200"
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
                Create Account
                {isHovering && <Sparkles className="h-4 w-4 animate-spin" />}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200">
                    Login here
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