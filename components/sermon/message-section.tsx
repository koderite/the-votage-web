"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { messages } from "./message";

export default function MessageSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredMessages = useMemo(() => {
    if (!normalizedQuery) return messages;

    return messages.filter((message) => {
      const haystack = [
        message.title,
        message.minister,
        message.text,
        message.date,
        message.service,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  return (
    <section
      id="messages"
      className="w-full py-12 md:py-16 px-4 bg-white lg:px-24 scroll-my-12 "
    >
      <div className="mx-auto max-w-7xl ">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h2 className="font-display text-2xl  lg:text-section-heading font-black text-black leading-tight uppercase">
                Our latest sermons
              </h2>
            </div>
          </div>
          <p className="font-body text-gray-700 text-xs lg:text-body-text-lg max-w-3xl mx-auto text-center">
            Sermons are uploaded at the end of every service for your progress
            and refreshments during the week as you go by your daily activities.
          </p>

          {/* Search Input */}
          <div className="mt-8 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <div className="flex items-center bg-white/10 rounded-full p-1 pl-6 border border-gray-200 focus-within:border-indigo-200 transition-colors">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search by title, minister, date, or text..."
                  className="bg-transparent border-none outline-none text-black w-full placeholder:text-gray-400"
                />
                <Button
                  type="button"
                  variant="black"
                  className="rounded-full px-8 py-2"
                  onClick={() => setSearchQuery("")}
                >
                  {searchQuery ? "Clear" : "Search"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid mx-auto  max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMessages.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No sermons match your search.
          </div>
        ) : (
          filteredMessages.map((message, index) => (
          <motion.div
            key={message.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="w-full h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${message.image})` }}
            ></div>
            <div className="p-4">
              <h4 className="font-semibold font-display text-black line-clamp-2 mb-2">
                {message.title}
              </h4>
              <p className="text-sm text-gray-500 mb-1">{message.minister}</p>
              <p className="text-sm text-gray-500 mb-1">Text: {message.text}</p>
              <p className="text-xs text-gray-400 mb-1">{message.date}</p>
              <p className="text-xs line-clamp-1 text-gray-400 mb-3">
                {message.service}
              </p>
              <a href={message.link} target="_blank" rel="noopener noreferrer">
                <Button variant="black" className="w-full">
                  Download
                </Button>
              </a>
            </div>
          </motion.div>
        )))}
      </div>

      <div className="grid place-content-center mt-8">
        <a href="https://t.me/AAAAAEZ6sbhFRtY4ERUROA" target="_blank">
          <Button variant="black" className="w-full max-w-xs">
            Find out more
          </Button>
        </a>
      </div>
    </section>
  );
}
