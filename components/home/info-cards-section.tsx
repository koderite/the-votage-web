"use client";

import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const infoCards = [
  {
    id: 1,
    title: 'Service Time',
    icon: <Clock className="w-6 h-6 text-white" />,
    contentTitle: 'Our Three Services',
    contentDetails: ['7:00 am', '8:00 am', '10:00 am'],
    isTime: true,
  },
  {
    id: 2,
    title: 'Location',
    icon: <MapPin className="w-6 h-6 text-white" />,
    contentTitle: 'Benin City',
    contentDetails: ['No144 Airport Road, after ADP Junction'],
    isTime: false,
  },
  {
    id: 3,
    title: 'Join A Connect',
    icon: <Users className="w-6 h-6 text-white" />,
    contentTitle: 'Tuesdays - Saturdays',
    contentDetails: ['5:30 pm'],
    isTime: false,
  },
];

export const InfoCardsSection = () => {
  return (
    <section className="bg-white py-12 lg:py-16 relative z-20 -mt-4 lg:-mt-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-[0px_15px_40px_rgba(0,0,0,0.08)] relative overflow-hidden p-6 lg:p-8 group cursor-default border border-gray-100"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-black rounded-bl-[100%] transition-transform duration-500 group-hover:scale-110 origin-top-right" />

              {/* Title */}
              <h3 className="font-copperplate font-bold text-2xl lg:text-3xl text-black mb-8 relative z-10">
                {card.title}
              </h3>

              {/* Inner Content Box */}
              <div className="bg-[#F5F5F5] rounded-xl p-4 flex items-center gap-4 relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="font-copperplate font-bold text-black text-sm lg:text-base mb-1">
                    {card.contentTitle}
                  </span>
                  
                  <div className={`font-body text-black/80 text-sm lg:text-base ${card.isTime ? 'flex gap-3' : ''}`}>
                    {card.contentDetails.map((detail, idx) => (
                      <span key={idx} className={card.isTime ? "font-medium" : ""}>
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
