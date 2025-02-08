// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { post } from '../services/ApiEndpoint'
// import { Logout } from '../redux/AuthSlice'

// export default function Home() {
//   const user=useSelector((state)=>state.Auth.user)
//   // console.log(user)
//   const navigate=useNavigate()
//   const disptach=useDispatch()
//   const gotoAdmin=()=>{
//         navigate('/admin')
//   }
//   const handleLogout=async()=>{
//     try {
//       const request= await post('/api/auth/logout')
//        const resspone= request.data
//        if (request.status==200) {
//            disptach(Logout())
//           navigate('/login')
//        }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <>

//      <div className='home-container'>
//       <div className='user-card'>
//         <h2> Welcome,{user && user.name}</h2>
//         <button className='logout-btn' onClick={handleLogout}>Logout</button>
//         {user && user.role=='admin' ? <button className='admin-btn' onClick={gotoAdmin}>Go To admin</button> :''}
        
//       </div>
//      </div>



//     </>
//   )
// }
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Timer, Route, Shield, ChartBar, Users, Gift } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mix-blend-overlay" />
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Bridging the Gap
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connecting surplus food with those in need through innovative technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                Donate Food
              </button>
              <button className="px-8 py-3 rounded-lg border border-gray-500 text-gray-300 font-medium hover:bg-white/5 transition-all">
                Join as NGO
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2 
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            Our Solution
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {impactMetrics.map((metric, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-2">
                  {metric.value}
                </p>
                <p className="text-gray-400">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Join Us in Making a Difference
            </h2>
            <p className="text-gray-400 mb-8">
              Whether you're a restaurant, NGO, or volunteer, you can help us create a hunger-free India.
            </p>
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 mx-auto">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Real-Time Matching',
    description: 'AI-powered system that instantly connects food donors with nearby NGOs and food banks.',
    icon: <Timer className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Smart Logistics',
    description: 'Optimized route planning and GPS tracking for efficient food pickup and delivery.',
    icon: <Route className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Quality Assurance',
    description: 'Advanced IoT monitoring to ensure food safety and freshness throughout the journey.',
    icon: <Shield className="w-6 h-6 text-pink-400" />
  },
  {
    title: 'Predictive Analytics',
    description: 'AI models that forecast food requirements and optimize distribution patterns.',
    icon: <ChartBar className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Community Platform',
    description: 'Seamless interface connecting donors, NGOs, and volunteers in real-time.',
    icon: <Users className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Reward System',
    description: 'Innovative incentives including tax benefits and CSR recognition for donors.',
    icon: <Gift className="w-6 h-6 text-pink-400" />
  }
];

const impactMetrics = [
  {
    value: '40%',
    label: 'of Food Saved from Waste'
  },
  {
    value: '1M+',
    label: 'Meals Distributed'
  },
  {
    value: '500+',
    label: 'NGO Partners'
  }
];