// import React from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Utensils, Timer, Route, Shield, ChartBar, Users, Gift } from 'lucide-react';

// const fadeIn = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6 }
// };

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mix-blend-overlay" />
//           <motion.div
//             initial={{ scale: 1.2, opacity: 0 }}
//             animate={{ scale: 1, opacity: 0.1 }}
//             transition={{ duration: 1 }}
//             className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"
//           />
//         </div>

//         <div className="container mx-auto px-4 z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center"
//           >
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//               Bridging the Gap
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
//               Connecting surplus food with those in need through innovative technology
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all">
//                 Donate Food
//               </button>
//               <button className="px-8 py-3 rounded-lg border border-gray-500 text-gray-300 font-medium hover:bg-white/5 transition-all">
//                 Join as NGO
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto">
//           <motion.h2 
//             {...fadeIn}
//             className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
//           >
//             Our Solution
//           </motion.h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all group"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-400">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Impact Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
//         <div className="container mx-auto">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
//           >
//             {impactMetrics.map((metric, index) => (
//               <div key={index} className="p-6">
//                 <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-2">
//                   {metric.value}
//                 </p>
//                 <p className="text-gray-400">{metric.label}</p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//               Join Us in Making a Difference
//             </h2>
//             <p className="text-gray-400 mb-8">
//               Whether you're a restaurant, NGO, or volunteer, you can help us create a hunger-free India.
//             </p>
//             <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 mx-auto">
//               Get Started <ArrowRight className="w-4 h-4" />
//             </button>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// const features = [
//   {
//     title: 'Real-Time Matching',
//     description: 'AI-powered system that instantly connects food donors with nearby NGOs and food banks.',
//     icon: <Timer className="w-6 h-6 text-blue-400" />
//   },
//   {
//     title: 'Smart Logistics',
//     description: 'Optimized route planning and GPS tracking for efficient food pickup and delivery.',
//     icon: <Route className="w-6 h-6 text-purple-400" />
//   },
//   {
//     title: 'Quality Assurance',
//     description: 'Advanced IoT monitoring to ensure food safety and freshness throughout the journey.',
//     icon: <Shield className="w-6 h-6 text-pink-400" />
//   },
//   {
//     title: 'Predictive Analytics',
//     description: 'AI models that forecast food requirements and optimize distribution patterns.',
//     icon: <ChartBar className="w-6 h-6 text-blue-400" />
//   },
//   {
//     title: 'Community Platform',
//     description: 'Seamless interface connecting donors, NGOs, and volunteers in real-time.',
//     icon: <Users className="w-6 h-6 text-purple-400" />
//   },
//   {
//     title: 'Reward System',
//     description: 'Innovative incentives including tax benefits and CSR recognition for donors.',
//     icon: <Gift className="w-6 h-6 text-pink-400" />
//   }
// ];

// const impactMetrics = [
//   {
//     value: '40%',
//     label: 'of Food Saved from Waste'
//   },
//   {
//     value: '1M+',
//     label: 'Meals Distributed'
//   },
//   {
//     value: '500+',
//     label: 'NGO Partners'
//   }
// ];
import React, { useState, useEffect } from 'react';
import {
  Heart,
  Users,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ImpactCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Home = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      name: "Ravi Kumar",
      role: "Restaurant Owner",
      image: "/api/placeholder/80/80",
      quote: "I'm proud that our surplus food now feeds 100 children every month instead of going to waste."
    },
    {
      name: "Priya Singh",
      role: "Volunteer",
      image: "/api/placeholder/80/80",
      quote: "Being part of this initiative has shown me how small actions can create big impact."
    },
    {
      name: "Amit Patel",
      role: "NGO Partner",
      image: "/api/placeholder/80/80",
      quote: "The platform has revolutionized how we connect with donors and serve our community."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Indian marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Feeding India, One Meal at a Time
          </h1>
          <p className="text-xl text-white mb-8">
            Transforming surplus into sustenance – Join the movement to end food waste and hunger across India.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition">
              Donate Now
            </button>
            <button className="bg-white text-green-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* Mission & Impact */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Mission & Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                <ImpactCounter end={100000} />+
              </div>
              <p className="text-gray-600">Meals Delivered</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                <ImpactCounter end={500} />+
              </div>
              <p className="text-gray-600">Food Waste Reduced (tonnes)</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <ImpactCounter end={50000} />+
              </div>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
          </div>

          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            In India, nearly 40% of food goes to waste while millions go hungry. We are here to bridge that gap by connecting surplus food from restaurants, caterers, and households with the hungry.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Donate", desc: "List your surplus food easily with a few clicks" },
              { icon: Clock, title: "Match", desc: "Our AI-driven system connects your donation with nearby NGOs" },
              { icon: Users, title: "Collect", desc: "Volunteers pick up and deliver food quickly" },
              { icon: ArrowRight, title: "Impact", desc: "See the tangible difference as communities thrive" }
            ].map((step, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <step.icon className="w-8 h-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stories of Change */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Stories of Change</h2>

          <div className="relative max-w-3xl mx-auto">
            <button
              onClick={() => setActiveStory((prev) => (prev - 1 + stories.length) % stories.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="text-center px-12">
              <img
                src={stories[activeStory].image}
                alt={stories[activeStory].name}
                className="w-20 h-20 rounded-full mx-auto mb-6"
              />
              <p className="text-xl italic mb-6">{stories[activeStory].quote}</p>
              <p className="font-semibold">{stories[activeStory].name}</p>
              <p className="text-gray-600">{stories[activeStory].role}</p>
            </div>

            <button
              onClick={() => setActiveStory((prev) => (prev + 1) % stories.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Join Us in Making a Difference</h2>
          <div className="flex justify-center gap-4">
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition">
              Donate Now
            </button>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition">
              Volunteer Today
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;