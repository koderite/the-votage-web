"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { messages, Message } from "./message";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    </div>
  );
}

export default function MessageSection() {
  const [sermons, setSermons] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query to prevent excessive API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch sermons from live API or handle errors silently
  // We fetch up to 500 items in one API call and paginate locally on the client
  const fetchSermons = useCallback(async () => {
    setLoading(true);
    setError(null);

    const API_URL = process.env.NEXT_PUBLIC_SERMON_API_URL || "https://votage-sermon-backend.onrender.com";
    
    // Attempt localtunnel URL, fallback to localhost:3001 if local or tunnel fails
    const urls = [API_URL];
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
      if (API_URL !== "http://localhost:3001") {
        urls.push("http://localhost:3001");
      }
    }

    let success = false;
    let lastError = null;

    for (const url of urls) {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        
        // Inject localtunnel bypass headers to avoid the warning page
        if (url.includes("loca.lt")) {
          headers["Bypass-Tunnel-Reminder"] = "true";
        }

        const params = new URLSearchParams({
          limit: "500",
          page: "1",
        });

        if (debouncedSearchQuery.trim()) {
          params.append("search", debouncedSearchQuery.trim());
        }

        // Apply a timeout of 3.5 seconds to localtunnel requests to quickly fall back to localhost
        const fetchOptions: RequestInit = { headers };
        if (url.includes("loca.lt")) {
          fetchOptions.signal = AbortSignal.timeout(3500);
        }

        const response = await fetch(`${url}/api/sermons?${params.toString()}`, fetchOptions);

        if (!response.ok) {
          throw new Error(`Failed to fetch sermons: ${response.statusText}`);
        }

        const result = await response.json();
        
        // Map API fields to frontend Message interface and filter by allowed speakers (Reverend Ohis Ojeikere and Pastor Anwinli Ojeikere)
        const mappedSermons = (result.data || [])
          .map((sermon: any): Message | null => {
            // Clean "Message:" prefix from title
            const cleanTitle = (sermon.title || "").replace(/^message\s*:\s*/i, "");

            // Parse description for fields
            const desc = sermon.description || "";
            const ministerMatch = desc.match(/Ministering\s*:\s*([^\n\r]+)/i);
            const textMatch = desc.match(/Text\s*:\s*([^\n\r]+)/i);

            let service = "Sunday Service";
            const lines = desc.split("\n").map((l: string) => l.trim()).filter(Boolean);
            if (lines.length > 0) {
              const lastLine = lines[lines.length - 1];
              if (lastLine.includes(":")) {
                const parts = lastLine.split(":");
                service = parts[parts.length - 1].trim();
              } else {
                service = lastLine;
              }
            }
            service = service.replace(/\s+/g, " ");

            const parsedMinister = sermon.speaker || (ministerMatch ? ministerMatch[1].trim() : "Rev. Ohis Ojeikere");
            
            // Check if minister is Reverend Ohis Ojeikere or Pastor Anwinli Ojeikere
            const speakerLower = parsedMinister.toLowerCase();
            const isOhis = speakerLower.includes("ohis");
            const isAnwinli = speakerLower.includes("anwinli");
            
            if (!isOhis && !isAnwinli) {
              return null; // Exclude other speakers
            }

            const parsedText = textMatch ? textMatch[1].trim() : "Scripture Reference";

            // Assign images dynamically based on speaker name
            let image = "/img/sermon/rev.png";
            
            if (speakerLower.includes("anwinli")) {
              image = "/img/sermon/firstlady2.png";
            } else if (speakerLower.includes("uju") || speakerLower.includes("okpala")) {
              image = "/img/sermon/firstlady3.png";
            } else if (speakerLower.includes("ohis")) {
              image = "/img/sermon/rev.png";
            } else if (speakerLower.includes("happy") || speakerLower.includes("steve")) {
              image = "/img/sermon/rev3.png";
            } else if (speakerLower.includes("laurel")) {
              image = "/img/sermon/rev4.png";
            } else if (speakerLower.includes("johnson") || speakerLower.includes("obodouku")) {
              image = "/img/sermon/rev3.png";
            } else if (speakerLower.includes("ebhonu") || speakerLower.includes("petry")) {
              image = "/img/sermon/rev4.png";
            }

            // Format date string from YYYY-MM-DD to MMM D, YYYY
            let formattedDate = sermon.date || "";
            if (formattedDate) {
              try {
                const d = new Date(formattedDate);
                if (!isNaN(d.getTime())) {
                  formattedDate = d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }
              } catch {
                // keep original if parsing fails
              }
            }

            return {
              id: sermon.id || sermon.telegramMessageId,
              title: cleanTitle,
              minister: parsedMinister,
              text: parsedText,
              date: formattedDate,
              service: service,
              image: image,
              link: sermon.telegramLink || "https://t.me/AAAAAEZ6sbhFRtY4ERUROA",
            };
          })
          .filter((s: Message | null): s is Message => s !== null);

        setSermons(mappedSermons);
        setIsOffline(false);
        success = true;
        break; // Stop loop once we fetch successfully
      } catch (err: any) {
        console.warn(`Live API request failed on ${url}:`, err);
        lastError = err;
      }
    }

    if (!success) {
      console.warn("All live API endpoints failed, switching silently to offline fallback.");
      setError(lastError?.message || "Failed to connect to the sermon feed.");
      setIsOffline(true);
    } else {
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  // Reset page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Fetch from backend when search parameters change (resets current page to 1)
  useEffect(() => {
    fetchSermons();
  }, [fetchSermons, debouncedSearchQuery]);

  // Fallback: local client-side search over mock data
  const offlineFilteredMessages = useMemo(() => {
    // Filter local messages first to only allowed speakers
    const localAllowed = messages.filter((message) => {
      const ministerLower = message.minister.toLowerCase();
      return ministerLower.includes("ohis") || ministerLower.includes("anwinli");
    });

    if (!isOffline) return [];
    
    const query = debouncedSearchQuery.trim().toLowerCase();
    if (!query) return localAllowed;

    return localAllowed.filter((message) => {
      const haystack = [
        message.title,
        message.minister,
        message.text,
        message.date,
        message.service,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [isOffline, debouncedSearchQuery]);

  // Choose display list based on offline/online mode
  // Paginate 8 items at a time client-side
  const displayedSermons = useMemo(() => {
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (!isOffline) {
      return sermons.slice(startIndex, endIndex);
    }
    return offlineFilteredMessages.slice(startIndex, endIndex);
  }, [isOffline, sermons, offlineFilteredMessages, currentPage]);

  // Compute total pages based on display mode
  const computedTotalPages = useMemo(() => {
    const listLength = !isOffline ? sermons.length : offlineFilteredMessages.length;
    return Math.max(1, Math.ceil(listLength / 8));
  }, [isOffline, sermons, offlineFilteredMessages]);

  return (
    <section
      id="messages"
      className="w-full py-12 md:py-16 px-4 bg-white lg:px-24 scroll-my-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h2 className="font-display text-2xl lg:text-section-heading font-black text-black leading-tight uppercase">
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

      {/* Sermons Cards Grid */}
      <div className="grid mx-auto max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedSermons.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No sermons match your search.
          </div>
        ) : (
          <>
            {displayedSermons.map((message, index) => (
              <motion.div
                key={message.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 16) * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <div
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${message.image})` }}
                  ></div>
                  <div className="p-4">
                    <h4 className="font-semibold font-display text-black line-clamp-2 mb-2 min-h-[3rem]">
                      {message.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">{message.minister}</p>
                    <p className="text-sm text-gray-500 mb-1">Text: {message.text}</p>
                    <p className="text-xs text-gray-400 mb-1">{message.date}</p>
                    <p className="text-xs line-clamp-1 text-gray-400">
                      {message.service}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  {message.link ? (
                    <a href={message.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="black" className="w-full rounded-xl">
                        Download
                      </Button>
                    </a>
                  ) : (
                    <Button variant="black" className="w-full rounded-xl" disabled>
                      Unavailable
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && computedTotalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 mb-6">
          <Button
            variant="black"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="px-5 py-2 rounded-full disabled:opacity-30 disabled:pointer-events-none"
          >
            Previous
          </Button>
          <span className="text-sm font-semibold text-gray-700">
            Page {currentPage} of {computedTotalPages}
          </span>
          <Button
            variant="black"
            size="sm"
            disabled={currentPage === computedTotalPages}
            onClick={() => setCurrentPage((prev) => Math.min(computedTotalPages, prev + 1))}
            className="px-5 py-2 rounded-full disabled:opacity-30 disabled:pointer-events-none"
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
