import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  ChevronDown, 
  BookOpen,
  Youtube,
  MessageSquare,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/Button';

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

const faqs = [
  {
    question: "How secure is Passcore?",
    answer: "Passcore uses military-grade AES-256 encryption to protect your passwords. Your data is encrypted locally before being stored or synced, ensuring that only you can access your passwords."
  },
  {
    question: "What happens if I forget my master password?",
    answer: "For security reasons, we cannot recover your master password. However, if you have enabled the recovery options, you can use your backup codes or recovery email to regain access to your account."
  },
  {
    question: "Can I access my passwords offline?",
    answer: "Yes! Passcore includes secure local storage, allowing you to access your passwords even without an internet connection. Changes will sync automatically when you're back online."
  },
  {
    question: "How do I import passwords from another password manager?",
    answer: "Passcore supports importing passwords from most popular password managers. Go to Settings > Import/Export and follow the instructions for your specific password manager."
  },
  {
    question: "Is biometric authentication secure?",
    answer: "Yes, biometric authentication (fingerprint/face recognition) is secure and adds an extra layer of protection. Your biometric data never leaves your device and is handled by your device's secure enclave."
  }
];

const supportOptions = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Documentation",
    description: "Comprehensive guides and tutorials",
    link: "/docs"
  },
  {
    icon: <Youtube className="h-6 w-6" />,
    title: "Video Tutorials",
    description: "Step-by-step visual guides",
    link: "/tutorials"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Community Forum",
    description: "Connect with other users",
    link: "/forum"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Always here to help",
    link: "/contact"
  }
];

const FAQ: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-gray-200 dark:border-gray-700"
      initial={false}
    >
      <button
        className="py-4 w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-gray-600 dark:text-gray-300">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export const Support: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How Can We Help?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get the support you need, when you need it
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full px-6 py-4 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button 
                  className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full"
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Support Options */}
      <motion.section 
        className="py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.link}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                  <div className="text-indigo-600 dark:text-indigo-400 group-hover:text-white">
                    {option.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {option.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find quick answers to common questions
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            variants={fadeIn}
          >
            <div className="p-6">
              {faqs.map((faq, index) => (
                <FAQ key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeIn}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Still Need Help?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Our support team is just a message away
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Available 24/7</p>
                <Button className="w-full">Start Chat</Button>
              </motion.div>

              <motion.div 
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Response within 24h</p>
                <Button className="w-full">Send Email</Button>
              </motion.div>

              <motion.div 
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Premium customers</p>
                <Button className="w-full">Call Now</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Status Section */}
      <motion.section 
        className="py-12 bg-gray-50 dark:bg-gray-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">All systems operational</span>
            <a href="/status" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-2">
              View status page
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
