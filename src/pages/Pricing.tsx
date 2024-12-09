import React from 'react';
import { Check, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: 'forever',
      features: [
        'Up to 50 passwords',
        'Basic password generator',
        'Secure encryption',
        'Mobile access',
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Personal',
      price: '€0.80',
      period: 'per month',
      features: [
        'Unlimited passwords',
        'Advanced password generator',
        'Secure sharing',
        'Priority support',
        'Password health reports',
        'Two-factor authentication',
        'Emergency access'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Team',
      price: '€0.80',
      period: 'per user/month',
      features: [
        'Everything in Personal',
        'Team password sharing',
        'Access controls',
        'Admin dashboard',
        'Activity logs',
        'API access',
        'SSO integration'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-4">
          <Shield className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Choose the plan that's right for you or your team
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm ${
              plan.popular ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white">
                  Most Popular
                </span>
              </div>
            )}
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  /{plan.period}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};