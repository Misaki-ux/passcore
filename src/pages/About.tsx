import React from 'react';
import { Shield, Lock, Cloud, Users, Key, Zap, Heart, Award, Database, History, AlertTriangle, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Military-Grade Encryption",
    description: "Your passwords are protected with AES-256 encryption, the same standard used by governments and military organizations."
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Secure Cloud Sync",
    description: "Access your passwords across all your devices with real-time synchronization and automatic backups."
  },
  {
    icon: <Key className="h-6 w-6" />,
    title: "Password Generator",
    description: "Create strong, unique passwords with our advanced generator that follows the latest security recommendations."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Quick Access",
    description: "Instantly access your passwords with our quick search and browser extensions."
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Secure Local Storage",
    description: "Your passwords are encrypted and securely stored locally using advanced encryption, ensuring offline access and enhanced security."
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "Password History",
    description: "Keep track of password changes and access previous versions when needed, with secure version control."
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Breach Alerts",
    description: "Receive instant notifications if your passwords appear in known data breaches, helping you stay secure."
  },
  {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Biometric Authentication",
    description: "Use fingerprint or face recognition to quickly and securely access your password vault."
  }
];

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Michael Rodriguez",
    role: "Security Expert",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Emma Wilson",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

export const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={fadeIn}
          >
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Shield className="h-20 w-20 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Securing Your Digital Life
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Passcore is more than just a password manager. It's your personal vault for the digital age,
              protecting your online identity with state-of-the-art security.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <div className="text-indigo-600 dark:text-indigo-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 bg-indigo-600 dark:bg-indigo-900"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-indigo-100">Active Users</div>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-indigo-100">Uptime</div>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-100">Support</div>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="text-4xl font-bold text-white mb-2">256bit</div>
              <div className="text-indigo-100">AES Encryption</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Security Facts Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Security Facts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Why your passwords need Passcore's protection
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              variants={fadeIn}
            >
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">80%</div>
              <p className="text-gray-600 dark:text-gray-300">
                of data breaches are caused by weak or reused passwords
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              variants={fadeIn}
            >
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">300B+</div>
              <p className="text-gray-600 dark:text-gray-300">
                passwords protected worldwide by password managers
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              variants={fadeIn}
            >
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">15,000+</div>
              <p className="text-gray-600 dark:text-gray-300">
                hours of security testing and auditing
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The passionate people behind Passcore
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <motion.div
                  className="relative w-48 h-48 mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-indigo-600 opacity-0 hover:opacity-10 transition-opacity" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-900"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            variants={fadeIn}
          >
            <div className="flex justify-center mb-6">
              <Heart className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We believe in making the digital world a safer place for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="flex items-start space-x-4"
              variants={fadeIn}
            >
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Security First
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We never compromise on security. Your data's safety is our top priority.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={fadeIn}
            >
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  User Privacy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe privacy is a fundamental human right.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={fadeIn}
            >
              <div className="flex-shrink-0">
                <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We continuously evolve to stay ahead of security threats.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={fadeIn}
            >
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We strive for excellence in everything we do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
