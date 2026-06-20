"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const planVisitSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type PlanVisitFormData = z.infer<typeof planVisitSchema>;

export function PlanYourVisitContactForm() {
  const [result, setResult] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanVisitFormData>({
    resolver: zodResolver(planVisitSchema),
  });

  const onSubmit = async (data: PlanVisitFormData) => {
    setResult("");

    const payload = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Phone: data.phone,
      Subject: data.subject,
      Message: data.message,
      Timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.status === "success") {
        setResult(
          "Thank you! Your visit request has been submitted successfully.",
        );
        reset();
      } else {
        setResult("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("SpreadAPI error:", error);
      setResult("An error occurred while submitting. Please try again later.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      id="contact-form"
      className="w-full flex-1  bg-white py-16 md:py-24 px-6 md:px-8"
    >
      <motion.div
        className="max-w-225 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-[36px] font-copperplate text-black md:text-[42px] lg:text-[48px] font-bold tracking-tight leading-tight mb-4">
            LET US KNOW YOU'RE COMING
          </h2>
          <p className="text-[16px] md:text-[18px] lg:text-[24px] text-black/80">
            Planning to Visit? Fill out this quick form so we can welcome you!
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name & Last Name */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                disabled={isSubmitting}
                className="w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black/50 focus:text-black"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                disabled={isSubmitting}
                className="w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black/50 focus:text-black"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </motion.div>

          {/* Email & Phone Number */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                disabled={isSubmitting}
                className="w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black/50 focus:text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-black text-[15px] font-semibold mb-3"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                disabled={isSubmitting}
                className="w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black/50 focus:text-black"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </motion.div>

          {/* Subject */}
          <motion.div className="mb-6 md:mb-8" variants={itemVariants}>
            <label
              htmlFor="subject"
              className="block text-black text-[15px] font-semibold mb-3"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              {...register("subject")}
              disabled={isSubmitting}
              className="w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black/50 focus:text-black"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div className="mb-8 md:mb-10" variants={itemVariants}>
            <label
              htmlFor="message"
              className="block text-black text-[15px] font-semibold mb-3"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={5}
              disabled={isSubmitting}
              className="w-full px-6 py-4 border-2 border-black/80 rounded-4xl outline-none transition-all duration-200 focus:border-black focus:shadow-lg resize-none disabled:opacity-50 disabled:cursor-not-allowed text-black/50 focus:text-black"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </motion.div>

          {/* Result Message */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 text-center py-4 px-6 rounded-xl ${
                result.includes("Thank you")
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {result}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-copperplate bg-black text-white py-5 rounded-full text-[14px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "LET US KNOW YOU'RE COMING"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
