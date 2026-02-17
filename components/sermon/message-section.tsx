"use client";

import { Button } from "../ui/button";
import { messages } from "./message";

export default function MessageSection() {
  return (
    <section className="w-full py-12 md:py-16 px-4 bg-white lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight uppercase">
                Our latest sermons
              </h2>
            </div>
          </div>
          <p className="font-body text-gray-700 text-xs md:text-sm max-w-3xl mx-auto text-center">
            Sermons are uploaded at the end of every service for your progress
            and refreshments during the week as you go by your dail actifities.
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border"
          >
            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-lg font-display h-12 text-black line-clamp-2">
                {message.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">{message.minister}</p>

              <p className="text-sm text-gray-500">Text: {message.text}</p>

              <p className="text-xs text-gray-400 mt-2">{message.date}</p>

              <p className="text-xs line-clamp-1 text-gray-400">
                {message.service}
              </p>

              <Button variant="black" className="mt-4 w-full">
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
