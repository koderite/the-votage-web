"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const accordionItems = [
  {
    id: 'join-connect',
    title: 'Join a connect',
    href: '/connect',
    content: 'Connect groups are small communities where you can build real relationships, grow in your faith, and be part of a family that cares for one another. Join a connect today and find your community.'
  },
  {
    id: 'get-baptized',
    title: 'Get Baptized',
    href: '/contact',
    content: 'Baptism is a public declaration of your faith in Jesus Christ. It symbolizes the old you being buried and the new you rising to live a transformed life. Join us for our next baptism service.'
  },
  {
    id: 'give-building',
    title: 'Give to our Building',
    href: null,
    content: 'Help us build a place where generations can encounter God. Your generosity shapes the future of our church and creates a lasting legacy for the Kingdom. Every contribution makes a difference.'
  }
];

export const QuickLinksSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="bg-quick-links-bg py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[73px]">
        <div className="max-w-full">
          <h2 className="font-copperplate text-4xl lg:text-5xl text-left mb-12 text-black">
            Quick Links
          </h2>
          
          <div className="flex flex-col gap-4">
            {accordionItems.map((item) => {
              const isOpen = openItem === item.id;
              
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-4 py-3 md:px-6 md:py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-body text-xl lg:text-2xl text-black font-medium">
                      {item.title}
                    </span>
                    <div className={`w-12 h-12 bg-black rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'group-hover:scale-110'}`}>
                      {isOpen ? (
                        <Minus className="w-6 h-6 text-white" />
                      ) : (
                        <Plus className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6">
                      <p className="font-body text-lg text-gray-600 leading-relaxed">
                        {item.content}
                      </p>
                      {item.href ? (
                        <Link href={item.href} className="mt-4 inline-block px-6 py-2 bg-black text-white font-body text-lg rounded hover:bg-gray-800 transition-colors">
                          Learn More
                        </Link>
                      ) : (
                        <button className="mt-4 px-6 py-2 bg-black text-white font-body text-lg rounded hover:bg-gray-800 transition-colors">
                          Learn More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
