'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { MultiSelect } from './multi-select';
import { FormInput } from './form-input';

const svgPath = "M11.0744 4.36121C10.2264 4.5825 9.682 4.89583 9.25704 5.311C8.65975 5.8985 8.27004 6.721 8.05658 8.27396C7.83725 9.87392 7.83333 11.9928 7.83333 15.0302V31.8131C8.60879 31.2837 9.46918 30.8909 10.3772 30.6518C10.6065 30.5908 10.8394 30.5437 11.0744 30.5108V4.36121ZM14.3154 30.3816H39.1667V15.0322C39.1667 11.9928 39.1627 9.87392 38.9434 8.27396C38.73 6.721 38.3402 5.8985 37.743 5.311C37.1437 4.72546 36.3055 4.34358 34.7193 4.136C33.086 3.92058 30.924 3.91667 27.822 3.91667H19.178C17.2157 3.91667 15.6295 3.91667 14.3154 3.97346V30.3816ZM17.0179 33.556H14.6366C12.5216 33.556 11.7833 33.5698 11.2154 33.7186C10.4587 33.9135 9.76081 34.2895 9.18184 34.8142C8.60288 35.3389 8.16024 35.9966 7.89208 36.7305C7.92211 37.476 7.97694 38.1412 8.05658 38.726C8.27004 40.279 8.65975 41.1015 9.25704 41.689C9.85629 42.2745 10.6945 42.6564 12.2807 42.864C13.914 43.0794 16.076 43.0833 19.178 43.0833H27.822C30.924 43.0833 33.088 43.0794 34.7193 42.866C36.3055 42.6564 37.1457 42.2745 37.743 41.689C38.3402 41.1015 38.73 40.279 38.9434 38.726C39.1236 37.4218 39.1588 35.769 39.1647 33.556H25.662V39.4448C25.662 40.0283 25.662 40.3201 25.4564 40.4376C25.2507 40.5551 24.9707 40.4239 24.4106 40.1635L21.7277 38.914C21.5358 38.8259 21.4418 38.7828 21.34 38.7828C21.2381 38.7828 21.1441 38.8259 20.9522 38.914L18.2693 40.1635C17.7073 40.4239 17.4272 40.5551 17.2216 40.4376C17.0179 40.3201 17.0179 40.0264 17.0179 39.4448V33.556Z";

function SolarBookBookmarkMinimalisticBold() {
  return (
    <motion.div
      className="relative shrink-0 size-[47px]"
      data-name="solar:book-bookmark-minimalistic-bold"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 47">
        <path d={svgPath} fill="black" />
      </svg>
    </motion.div>
  );
}

const departmentOptions = [
  { value: 'GTA', label: 'GTA' },
  { value: 'USHERING', label: 'Ushering' },
  { value: 'PROTOCOL', label: 'Protocol' },
  { value: 'SECURITY', label: 'Security and Surveillance' },
  { value: 'TRAFFIC', label: 'Traffic Unit' },
  { value: 'VIP', label: 'VIP/Greeters' },
  { value: 'FOLLOW_UP', label: 'Follow Up' },
  { value: 'CARE', label: 'Care Team' },
  { value: 'PUBLICATION', label: 'Publication' },
  { value: 'EVANGELISM', label: 'Evangelism' },
  { value: 'FACILITY', label: 'Facility' },
  { value: 'SANITATION', label: 'Sanitation' },
  { value: 'VOTAGE_ACT', label: 'Votage Act' },
  { value: 'SPOKEN_WORD', label: 'Spoken Word' },
  { value: 'DANCE', label: 'Dance' },
  { value: 'RMG', label: 'RMG' },
  { value: 'CHILDREN', label: "Children's Department" },
  { value: 'PHOTOGRAPHY', label: 'Photography' },
  { value: 'VIDEOGRAPHY', label: 'Videography' },
  { value: 'PROJECTING', label: 'Projecting' },
  { value: 'LIVESTREAM', label: 'Livestream' },
  { value: 'CONTENT', label: 'Content Creation' },
  { value: 'SOCIAL', label: 'Social Media' },
  { value: 'GRAPHICS', label: 'Graphics' },
  { value: 'LIGHTING', label: 'Lighting' },
  { value: 'SOUND', label: 'Sound' },
  { value: 'PRAYER', label: 'Prayer Department' },
];

export function EnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    howHeard: '',
    studentType: '',
    connectGroup: '',
    departments: [] as string[],
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (result) setResult('');
  };

  const handleMultiSelectChange = (field: string, value: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (result) setResult('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('');

    const payload = {
      FullName: formData.fullName,
      PhoneNumber: formData.phoneNumber,
      Email: formData.email,
      HowHeardAboutChurch: formData.howHeard,
      StudentType: formData.studentType,
      ConnectGroup: formData.connectGroup,
      Departments: formData.departments.join(', '),
      Timestamp: new Date().toISOString(),
    };

    try {
      // Send to API route which handles Google Sheets submission
      const apiResponse = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const apiData = await apiResponse.json();
      console.log('Enrollment API response:', apiData);

      // Also send to Web3Form
      const web3formAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';
      if (web3formAccessKey) {
        const web3formResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formAccessKey,
            ...payload,
          }),
        });

        const web3formData = await web3formResponse.json();
        console.log('Web3Form response:', web3formData);

        if (!web3formResponse.ok) {
          console.warn('Web3Form submission failed:', web3formData);
        }
      }

      // Check API response for success
      if (!apiResponse.ok) {
        throw new Error(apiData.message || `Server error: ${apiResponse.status}`);
      }

      if (apiData.status === 'success') {
        setResult('Thank you! Your enrollment has been submitted successfully.');
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          howHeard: '',
          studentType: '',
          connectGroup: '',
          departments: [],
        });
      } else {
        throw new Error(apiData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setResult('An error occurred while submitting. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full max-w-[830px] mx-auto">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SolarBookBookmarkMinimalisticBold />
        <p className="font-['Arial',sans-serif] font-bold leading-[normal] text-[16px] md:text-[20px] text-black uppercase text-center md:text-left">
          Please fill the details correctly!
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Full Name */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onFocus={() => setFocusedField('fullName')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              placeholder="Enter your full name"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === 'fullName' ? 'text-black' : 'text-black/50'
              }`}
            />
          </motion.div>

          {/* Phone Number */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              onFocus={() => setFocusedField('phoneNumber')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              placeholder="Enter your phone number"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === 'phoneNumber' ? 'text-black' : 'text-black/50'
              }`}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              placeholder="Enter your email"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === 'email' ? 'text-black' : 'text-black/50'
              }`}
            />
          </motion.div>

          {/* How did you hear about Church? */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              How did you hear about us?
            </label>
            <input
              type="text"
              value={formData.howHeard}
              onChange={(e) => handleChange('howHeard', e.target.value)}
              onFocus={() => setFocusedField('howHeard')}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              placeholder="Tell us how you heard about us"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === 'howHeard' ? 'text-black' : 'text-black'
              }`}
            />
          </motion.div>

          {/* Fresh or Returning Student */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              Are you a fresh or returning student?
            </label>
            <div className="flex gap-4">
              {['Fresh', 'Returning'].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-4 py-3 border-2 rounded-full cursor-pointer transition-all duration-200 ${
                    formData.studentType === type
                      ? 'border-black bg-black text-white'
                      : 'border-black/80 hover:border-black text-black'
                  }`}
                >
                  <input
                    type="radio"
                    name="studentType"
                    value={type}
                    checked={formData.studentType === type}
                    onChange={(e) => handleChange('studentType', e.target.value)}
                    disabled={isSubmitting}
                    className="sr-only"
                  />
                  <span className="font-['Arial',sans-serif] text-[15px]">{type}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Connect Group */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              What connect group do you belong to?
            </label>
            <input
              type="text"
              value={formData.connectGroup}
              onChange={(e) => handleChange('connectGroup', e.target.value)}
              onFocus={() => setFocusedField('connectGroup')}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              placeholder="Enter your connect group"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === 'connectGroup' ? 'text-black' : 'text-black/50'
              }`}
            />
          </motion.div>

          {/* Department Selection */}
          <motion.div variants={itemVariants}>
            <MultiSelect
              label="What department would you be interested in? (Select max 2)"
              options={departmentOptions}
              selected={formData.departments}
              onChange={(value) => handleMultiSelectChange('departments', value)}
              maxSelect={2}
              placeholder="Select departments..."
            />
          </motion.div>

          {/* Result Message */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-4 px-6 rounded-xl ${
                result.includes('Thank you')
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
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
              {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
            </button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}
