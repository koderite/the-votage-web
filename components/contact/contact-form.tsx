'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('');

    const submitFormData = new FormData();
    submitFormData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '');
    submitFormData.append('firstName', formData.firstName);
    submitFormData.append('lastName', formData.lastName);
    submitFormData.append('email', formData.email);
    submitFormData.append('phone', formData.phone);
    submitFormData.append('subject', formData.subject);
    submitFormData.append('message', formData.message);
    submitFormData.append('from_name', `${formData.firstName} ${formData.lastName}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitFormData
      });

      const data = await response.json();

      if (data.success) {
        setResult('Thank you! Your message has been sent successfully.');
        // Clear form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setResult('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setResult('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none ${
                    focusedField === 'firstName'
                      ? 'border-[#1a1a1a] shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none ${
                    focusedField === 'lastName'
                      ? 'border-[#1a1a1a] shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
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
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none ${
                    focusedField === 'email'
                      ? 'border-[#1a1a1a] shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
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
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none ${
                    focusedField === 'phone'
                      ? 'border-[#1a1a1a] shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
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
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full px-6 py-4 bg-white border-2 rounded-full transition-all duration-300 outline-none ${
                  focusedField === 'subject'
                    ? 'border-[#1a1a1a] shadow-md'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
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
                name="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full px-6 py-4 bg-white border-2 rounded-3xl transition-all duration-300 outline-none resize-none ${
                  focusedField === 'message'
                    ? 'border-[#1a1a1a] shadow-md'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
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
