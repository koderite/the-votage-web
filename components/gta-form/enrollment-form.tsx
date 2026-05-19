"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MultiSelect } from "./multi-select";
import { FormInput } from "./form-input";

// WhatsApp waiting room link - configure via environment variable
const WHATSAPP_WAITING_ROOM = process.env.NEXT_PUBLIC_WHATSAPP_WAITING_ROOM || "https://chat.whatsapp.com/H8woNBtWBVY4JuKKBu7ltg";

const svgPath =
  "M11.0744 4.36121C10.2264 4.5825 9.682 4.89583 9.25704 5.311C8.65975 5.8985 8.27004 6.721 8.05658 8.27396C7.83725 9.87392 7.83333 11.9928 7.83333 15.0302V31.8131C8.60879 31.2837 9.46918 30.8909 10.3772 30.6518C10.6065 30.5908 10.8394 30.5437 11.0744 30.5108V4.36121ZM14.3154 30.3816H39.1667V15.0322C39.1667 11.9928 39.1627 9.87392 38.9434 8.27396C38.73 6.721 38.3402 5.8985 37.743 5.311C37.1437 4.72546 36.3055 4.34358 34.7193 4.136C33.086 3.92058 30.924 3.91667 27.822 3.91667H19.178C17.2157 3.91667 15.6295 3.91667 14.3154 3.97346V30.3816ZM17.0179 33.556H14.6366C12.5216 33.556 11.7833 33.5698 11.2154 33.7186C10.4587 33.9135 9.76081 34.2895 9.18184 34.8142C8.60288 35.3389 8.16024 35.9966 7.89208 36.7305C7.92211 37.476 7.97694 38.1412 8.05658 38.726C8.27004 40.279 8.65975 41.1015 9.25704 41.689C9.85629 42.2745 10.6945 42.6564 12.2807 42.864C13.914 43.0794 16.076 43.0833 19.178 43.0833H27.822C30.924 43.0833 33.088 43.0794 34.7193 42.866C36.3055 42.6564 37.1457 42.2745 37.743 41.689C38.3402 41.1015 38.73 40.279 38.9434 38.726C39.1236 37.4218 39.1588 35.769 39.1647 33.556H25.662V39.4448C25.662 40.0283 25.662 40.3201 25.4564 40.4376C25.2507 40.5551 24.9707 40.4239 24.4106 40.1635L21.7277 38.914C21.5358 38.8259 21.4418 38.7828 21.34 38.7828C21.2381 38.7828 21.1441 38.8259 20.9522 38.914L18.2693 40.1635C17.7073 40.4239 17.4272 40.5551 17.2216 40.4376C17.0179 40.3201 17.0179 40.0264 17.0179 39.4448V33.556Z";

function SolarBookBookmarkMinimalisticBold() {
  return (
    <motion.div
      className="relative shrink-0 size-[47px]"
      data-name="solar:book-bookmark-minimalistic-bold"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47 47"
      >
        <path d={svgPath} fill="black" />
      </svg>
    </motion.div>
  );
}

// Success Modal Component
function SuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header with Icon */}
        <div className="px-8 pt-8 pb-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-black text-center"
          >
            Welcome to The Votage Church!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-3 text-gray-600 text-body-text-small text-center leading-relaxed"
            
          >
            Thank you for registering for GrowthTrack Academy! We are excited that you've chosen to be part of our church family.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-gray-600 text-body-text-small text-center leading-relaxed"
          >
            We assure you that you will flourish here, you're already loved and appreciated.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 text-gray-800 text-body-text-small text-center leading-relaxed font-medium"
          >
            At the moment, a cohort is currently ongoing. Join our waiting room with the link below, this is where all updates and information about the next cohort will be shared.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-gray-600 text-body-text-small text-center leading-relaxed"
          >
            Kindly join the WhatsApp group below to stay informed and receive all necessary details in due time. We look forward to going on this journey with you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-4 text-black text-center font-semibold"
          >
            Welcome once again to The Votage Church!
          </motion.p>

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <p className="text-gray-500 text-sm text-center mb-3">
              Join the Waiting Room here:
            </p>
            <a
              href={WHATSAPP_WAITING_ROOM}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-black hover:bg-black/80 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join the Waiting Room
            </a>
            <button
              onClick={onClose}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium py-2 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const departmentOptions = [
  { value: "GTA", label: "GTA" },
  { value: "USHERING", label: "Ushering" },
  { value: "PROTOCOL", label: "Protocol" },
  { value: "SECURITY", label: "Security and Surveillance" },
  { value: "TRAFFIC", label: "Traffic Unit" },
  { value: "VIP", label: "VIP/Greeters" },
  { value: "FOLLOW_UP", label: "Follow Up" },
  { value: "CARE", label: "Care Team" },
  { value: "PUBLICATION", label: "Publication" },
  { value: "EVANGELISM", label: "Evangelism" },
  { value: "FACILITY", label: "Facility" },
  { value: "SANITATION", label: "Sanitation" },
  { value: "VOTAGE_ACT", label: "Votage Act" },
  { value: "SPOKEN_WORD", label: "Spoken Word" },
  { value: "DANCE", label: "Dance" },
  { value: "RMG", label: "RMG" },
  { value: "CHILDREN", label: "Children's Department" },
  { value: "PHOTOGRAPHY", label: "Photography" },
  { value: "VIDEOGRAPHY", label: "Videography" },
  { value: "PROJECTING", label: "Projecting" },
  { value: "LIVESTREAM", label: "Livestream" },
  { value: "CONTENT", label: "Content Creation" },
  { value: "SOCIAL", label: "Social Media" },
  { value: "GRAPHICS", label: "Graphics" },
  { value: "LIGHTING", label: "Lighting" },
  { value: "SOUND", label: "Sound" },
  { value: "PRAYER", label: "Prayer Department" },
];

export function EnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    howHeard: "",
    studentType: "",
    connectGroup: "",
    departments: [] as string[],
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (result) setResult("");
  };

  const handleMultiSelectChange = (field: string, value: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (result) setResult("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const payload = {
      FullName: formData.fullName,
      PhoneNumber: formData.phoneNumber,
      Email: formData.email,
      HowHeardAboutChurch: formData.howHeard,
      StudentType: formData.studentType,
      ConnectGroup: formData.connectGroup,
      Departments: formData.departments.join(", "),
      Timestamp: new Date().toISOString(),
      FormType: "cohort1",
    };

    try {
      // Send to API route which handles Google Sheets submission
      const apiResponse = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const apiData = await apiResponse.json();
      console.log("Enrollment API response:", apiData);

      // Also send to Web3Form
      const web3formAccessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
      if (web3formAccessKey) {
        const web3formResponse = await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: web3formAccessKey,
              ...payload,
            }),
          },
        );

        const web3formData = await web3formResponse.json();
        console.log("Web3Form response:", web3formData);

        if (!web3formResponse.ok) {
          console.warn("Web3Form submission failed:", web3formData);
        }
      }

      // Check API response for success
      if (!apiResponse.ok) {
        throw new Error(
          apiData.message || `Server error: ${apiResponse.status}`,
        );
      }

      if (apiData.status === "success") {
        // Show success modal
        setShowSuccessModal(true);
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          howHeard: "",
          studentType: "",
          connectGroup: "",
          departments: [],
        });
      } else {
        throw new Error(apiData.message || "Submission failed");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      setResult("An error occurred while submitting. Please try again later.");
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
        <AnimatePresence>
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
              onChange={(e) => handleChange("fullName", e.target.value)}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              placeholder="Enter your full name"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === "fullName" ? "text-black" : "text-black/50"
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
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              onFocus={() => setFocusedField("phoneNumber")}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              placeholder="Enter your phone number"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === "phoneNumber" ? "text-black" : "text-black/50"
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
              onChange={(e) => handleChange("email", e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              placeholder="Enter your email"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === "email" ? "text-black" : "text-black/50"
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
              onChange={(e) => handleChange("howHeard", e.target.value)}
              onFocus={() => setFocusedField("howHeard")}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              placeholder="Tell us how you heard about us"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === "howHeard" ? "text-black" : "text-black"
              }`}
            />
          </motion.div>

          {/* Fresh or Returning Student */}
          <motion.div variants={itemVariants}>
            <label className="block text-black text-[15px] font-semibold mb-3">
              Are you a fresh or returning student?
            </label>
            <div className="flex gap-4">
              {["Fresh", "Returning"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-4 py-3 border-2 rounded-full cursor-pointer transition-all duration-200 ${
                    formData.studentType === type
                      ? "border-black bg-black text-white"
                      : "border-black/80 hover:border-black text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="studentType"
                    value={type}
                    checked={formData.studentType === type}
                    onChange={(e) =>
                      handleChange("studentType", e.target.value)
                    }
                    disabled={isSubmitting}
                    className="sr-only"
                  />
                  <span className="font-['Arial',sans-serif] text-[15px]">
                    {type}
                  </span>
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
              onChange={(e) => handleChange("connectGroup", e.target.value)}
              onFocus={() => setFocusedField("connectGroup")}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              placeholder="Enter your connect group"
              className={`w-full px-6 py-4 border-2 border-black/80 rounded-full outline-none transition-all duration-200 focus:border-black focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                focusedField === "connectGroup" ? "text-black" : "text-black/50"
              }`}
            />
          </motion.div>

          {/* Department Selection */}
          <motion.div variants={itemVariants}>
            <MultiSelect
              label="What department would you be interested in? (Select max 2)"
              options={departmentOptions}
              selected={formData.departments}
              onChange={(value) =>
                handleMultiSelectChange("departments", value)
              }
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
              {isSubmitting ? "Submitting..." : "Submit Enrollment"}
            </button>
          </motion.div>
        </motion.div>
        </AnimatePresence>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
