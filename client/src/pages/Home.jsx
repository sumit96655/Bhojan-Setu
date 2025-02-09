import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Users, Clock, ArrowRight,
  Facebook, Twitter, Instagram, 
  ChevronLeft, ChevronRight,
  Utensils, HandHeart, UserCheck, Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      quote: "Through this platform, we've reduced our food waste by 80% and helped feed hundreds of people."
    },
    {
      name: "Priya Singh",
      role: "Volunteer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      quote: "Every delivery I make connects surplus food with those who need it most. It's incredibly fulfilling."
    },
    {
      name: "Amit Patel",
      role: "NGO Partner",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
      quote: "The platform's efficiency has helped us scale our impact from 100 to 1000 meals per day."
    }
  ];

  const features = [
    {
      icon: Utensils,
      title: "Restaurants & Hotels",
      description: "Connect surplus food with those in need",
      color: "blue"
    },
    {
      icon: HandHeart,
      title: "NGOs & Charities",
      description: "Streamline food collection and distribution",
      color: "green"
    },
    {
      icon: UserCheck,
      title: "Volunteers",
      description: "Make a difference in your community",
      color: "orange"
    },
    {
      icon: Building,
      title: "Corporations",
      description: "Manage food waste responsibly",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center text-center"
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1594708767771-a7502209ff51"
            alt="Food donation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Bridging the Gap<br/>
            <span className="text-green-400">Food to All</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join India's largest food rescue network - Together we can end hunger
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="group relative px-8 py-3 bg-green-500 text-white rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-green-600 transform translate-y-full transition-transform group-hover:translate-y-0"></div>
              <span className="relative">Start Donating</span>
            </Link>
            <Link to="/register" className="group relative px-8 py-3 bg-white text-green-500 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gray-100 transform translate-y-full transition-transform group-hover:translate-y-0"></div>
              <span className="relative">Join as Volunteer</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Impact Stats with Animations */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Impact So Far
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { end: 100000, label: "Meals Delivered", color: "green" },
              { end: 500, label: "Tonnes of Food Saved", color: "orange" },
              { end: 50000, label: "Lives Impacted", color: "blue" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`text-center p-8 bg-${stat.color}-50 rounded-xl transform hover:scale-105 transition-transform`}
              >
                <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>
                  <ImpactCounter end={stat.end} />+
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Who We Serve
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className={`w-12 h-12 mb-4 bg-${feature.color}-100 rounded-lg flex items-center justify-center`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
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

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-green-500 to-green-600 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Make a Difference?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors">
              Start Donating
            </Link>
            <Link to="/register" className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;