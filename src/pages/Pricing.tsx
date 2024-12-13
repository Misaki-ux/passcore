import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Pricing: React.FC = () => {
  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center animate-fadeIn">
          <h1 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the plan that's right for you or your team
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-4 lg:gap-8">
          {/* Free Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300 animate-slideUp opacity-0 [animation-delay:200ms] hover:-translate-y-2">
            <h3 className="text-lg font-semibold leading-8 text-indigo-600">Free</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for trying out Passcore.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">€0</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
            </p>
            <Button className="mt-6 w-full">Get started for free</Button>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn" />
                Store up to 15 passwords
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:100ms]" />
                Basic password generation
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:200ms]" />
                Access on one device
              </li>
            </ul>
          </div>

          {/* Basic Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300 animate-slideUp opacity-0 [animation-delay:300ms] hover:-translate-y-2">
            <h3 className="text-lg font-semibold leading-8 text-indigo-600">Basic</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">Essential features for personal use.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">€1</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
            </p>
            <Button className="mt-6 w-full">Start Basic Plan</Button>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:250ms]" />
                Store up to 50 passwords
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:350ms]" />
                Advanced password generation
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:450ms]" />
                Access on 2 devices
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:550ms]" />
                Basic security alerts
              </li>
            </ul>
          </div>

          {/* Family Plan */}
          <div className="rounded-3xl p-8 ring-2 ring-indigo-600 hover:shadow-xl transition-all duration-300 animate-slideUp opacity-0 [animation-delay:400ms] hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-float">
              Popular
            </div>
            <h3 className="text-lg font-semibold leading-8 text-indigo-600">Family</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for families up to 6 members.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">€5</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
            </p>
            <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500">Get Family Plan</Button>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:300ms]" />
                6 secured personal dashboards
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:400ms]" />
                Unlimited passwords per dashboard
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:500ms]" />
                Access on unlimited devices
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:600ms]" />
                Secure password sharing
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:700ms]" />
                Family password recovery
              </li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300 animate-slideUp opacity-0 [animation-delay:600ms] hover:-translate-y-2">
            <h3 className="text-lg font-semibold leading-8 text-indigo-600">Enterprise</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for large organizations.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">€10</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/user/month</span>
            </p>
            <Button className="mt-6 w-full">Contact Sales</Button>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:700ms]" />
                Everything in Family plan
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:800ms]" />
                Advanced team management
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:900ms]" />
                Custom security policies
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:1000ms]" />
                24/7 priority support
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600 animate-scaleIn [animation-delay:1100ms]" />
                SSO Integration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
