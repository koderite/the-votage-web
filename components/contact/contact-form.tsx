'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  const [result, setResult] = useState('');

  const onSubmit = async (data: ContactFormData) => {
    setResult('');

    const submitFormData = new FormData();
    submitFormData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '');
    submitFormData.append('firstName', data.firstName);
    submitFormData.append('lastName', data.lastName);
    submitFormData.append('email', data.email);
    submitFormData.append('phone', data.phone || '');
    submitFormData.append('subject', data.subject);
    submitFormData.append('message', data.message);
    submitFormData.append('from_name', `${data.firstName} ${data.lastName}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitFormData
      });

      const responseData = await response.json();

      if (responseData.success) {
        setResult('Thank you! Your message has been sent successfully.');
        reset();
      } else {
        setResult('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setResult('An error occurred. Please try again later.');
    }
  };

  const handleCancel = () => {
    reset();
    setResult('');
  };

  return (
    <section id="contact-form" className="py-24 px-8 md:px-16 lg:px-24 bg-[#f5f5f3]">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-copperplate font-bold text-[#1a1a1a] mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-[#1a1a1a]/70 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as possible
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="firstName" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  className="w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none focus:border-[#1a1a1a] focus:shadow-md border-gray-300 hover:border-gray-400"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="lastName" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className="w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none focus:border-[#1a1a1a] focus:shadow-md border-gray-300 hover:border-gray-400"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </motion.div>
            </div>

            {/* Email & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none focus:border-[#1a1a1a] focus:shadow-md border-gray-300 hover:border-gray-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none focus:border-[#1a1a1a] focus:shadow-md border-gray-300 hover:border-gray-400"
                />
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="subject" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Subject
              </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className="w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none focus:border-[#1a1a1a] focus:shadow-md border-gray-300 hover:border-gray-400"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
            </motion.div>

            {/* Message */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                {...register('message')}
                className="w-full px-6 py-4 bg-white border-2 rounded-3xl transition-all duration-300 outline-none resize-none focus:border-[#1a1a1a] focus:shadow-md border-gray-300 hover:border-gray-400"
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
                className={`text-center py-3 px-4 rounded-xl ${
                  result.includes('Thank you')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {result}
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="px-12 py-4 bg-[#1a1a1a] text-white rounded-full font-medium text-sm uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors font-light shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="px-12 py-4 bg-white text-[#1a1a1a] border-2 border-gray-300 rounded-full font-medium text-sm lowercase hover:border-gray-400 font-copperplate-light transition-colors disabled:opacity-50"
              >
                cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactForm;
