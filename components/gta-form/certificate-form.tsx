"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

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

function Frame() {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center relative shrink-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <SolarBookBookmarkMinimalisticBold />
      <p className="font-['Arial',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] md:text-[20px] text-black text-center md:text-left uppercase px-4 md:px-0">
        Please fill the details correctly!
      </p>
    </motion.div>
  );
}

function InputField({
  label,
  placeholder,
  error,
  type = "text",
  delay = 0,
  ...props
}: {
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  delay?: number;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-2 items-start relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-col font-['Arial',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d6d6d] text-[14px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">{label}</p>
      </div>
      <div className="h-[54px] relative rounded-[8px] shrink-0 w-full">
        <div
          className="absolute border border-solid inset-0 pointer-events-none rounded-[8px] transition-colors duration-200"
          style={{
            borderColor: isFocused ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)",
          }}
        />
        <div className="flex flex-row items-center size-full">
          <div className="flex items-center px-4 py-2 relative size-full">
            <input
              type={type}
              onFocus={() => setIsFocused(true)}
              {...props}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              placeholder={placeholder}
              className="w-full h-full bg-transparent border-none outline-none font-['Arial',sans-serif] text-[16px] text-black placeholder:text-[#959595]"
            />
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </motion.div>
  );
}

function DateInput({
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  delay = 0,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  delay?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (newValue: string) => {
    const numericValue = newValue.replace(/\D/g, "");
    if (!maxLength || numericValue.length <= maxLength) {
      onChange(numericValue);
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-2 items-start relative shrink-0 w-[80px] md:w-[100px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="h-[54px] relative rounded-[8px] shrink-0 w-full">
        <div
          className="absolute border border-solid inset-0 pointer-events-none rounded-[8px] transition-colors duration-200"
          style={{
            borderColor: isFocused ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)",
          }}
        />
        <div className="flex flex-row items-center size-full">
          <div className="flex items-center px-2 py-2 relative size-full">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="w-full h-full bg-transparent border-none outline-none font-['Arial',sans-serif] text-[16px] text-center text-black placeholder:text-[#959595]"
            />
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </motion.div>
  );
}

function Box({
  fullNameProps,
  phoneNumberProps,
  fullNameError,
  phoneNumberError,
}: {
  fullNameProps: React.InputHTMLAttributes<HTMLInputElement>;
  phoneNumberProps: React.InputHTMLAttributes<HTMLInputElement>;
  fullNameError?: string;
  phoneNumberError?: string;
}) {
  return (
    <div
      className="flex flex-col gap-6 items-start justify-center relative shrink-0 w-full"
      data-name="Box"
    >
      <InputField
        label="Full Name"
        placeholder="Anastasia"
        delay={0.3}
        error={fullNameError}
        {...fullNameProps}
      />
      <InputField
        label="Phone Number"
        placeholder="09022**********"
        type="tel"
        delay={0.4}
        error={phoneNumberError}
        {...phoneNumberProps}
      />
    </div>
  );
}

function Frame2({
  fullNameProps,
  phoneNumberProps,
  fullNameError,
  phoneNumberError,
}: {
  fullNameProps: React.InputHTMLAttributes<HTMLInputElement>;
  phoneNumberProps: React.InputHTMLAttributes<HTMLInputElement>;
  fullNameError?: string;
  phoneNumberError?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center relative shrink-0 w-full">
      <Box
        fullNameProps={fullNameProps}
        phoneNumberProps={phoneNumberProps}
        fullNameError={fullNameError}
        phoneNumberError={phoneNumberError}
      />
    </div>
  );
}

function Container4({
  emailError,
  ...emailProps
}: {
  emailError?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className="flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <InputField
        label="Email"
        placeholder="Anastasia@gmail.com"
        type="email"
        delay={0.5}
        error={emailError}
        {...emailProps}
      />
    </div>
  );
}

function Frame3() {
  return (
    <motion.div
      className="flex items-center relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex flex-col items-start justify-center pr-2 relative shrink-0">
        <div className="flex flex-col font-['Arial',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] md:text-[20px] text-black whitespace-nowrap">
          <p className="leading-[normal]">
            What date Did You Complete growth TracK?
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DateFields({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  dayError,
  monthError,
  yearError,
}: {
  day: string;
  setDay: (value: string) => void;
  month: string;
  setMonth: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  dayError?: string;
  monthError?: string;
  yearError?: string;
}) {
  return (
    <div className="flex gap-4 items-start relative shrink-0 w-full">
      <DateInput
        placeholder="Day"
        value={day}
        onChange={setDay}
        maxLength={2}
        delay={0.7}
        error={dayError}
      />
      <DateInput
        placeholder="Month"
        value={month}
        onChange={setMonth}
        maxLength={2}
        delay={0.8}
        error={monthError}
      />
      <DateInput
        placeholder="Year"
        value={year}
        onChange={setYear}
        maxLength={4}
        delay={0.9}
        error={yearError}
      />
    </div>
  );
}

function Cta({
  onClick,
  disabled,
  isLoading,
}: {
  onClick: () => void;
  disabled: boolean;
  isLoading?: boolean;
}) {
  return (
    <motion.button
      className="bg-black flex h-[54px] items-center justify-center p-[10px] relative rounded-[36px] shrink-0 w-[190px] cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
      data-name="CTA"
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      whileHover={
        !disabled
          ? {
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="flex flex-col font-['Arial',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">
        <p className="leading-[24px]">
          {isLoading ? "Submitting..." : "Submit"}
        </p>
      </div>
    </motion.button>
  );
}

const certificateSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  day: z.string().min(1, "Day is required").regex(/^\d+$/, "Must be a number"),
  month: z.string().min(1, "Month is required").regex(/^\d+$/, "Must be a number"),
  year: z.string().min(1, "Year is required").regex(/^\d+$/, "Must be a number"),
}).refine((data) => {
  const dayNum = parseInt(data.day);
  return dayNum >= 1 && dayNum <= 31;
}, { message: "Day must be between 1-31", path: ["day"] }).refine((data) => {
  const monthNum = parseInt(data.month);
  return monthNum >= 1 && monthNum <= 12;
}, { message: "Month must be between 1-12", path: ["month"] }).refine((data) => {
  const yearNum = parseInt(data.year);
  return yearNum >= 1900 && yearNum <= 2026;
}, { message: "Year must be between 1900-2026", path: ["year"] })

type CertificateFormData = z.infer<typeof certificateSchema>

function CertificateFormModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
  })
  const [result, setResult] = useState("");

  const onSubmit = async (data: CertificateFormData) => {
    setResult("");

    const completionDate = `${data.month}/${data.day}/${data.year}`;

    const payload = {
      FullName: data.fullName,
      PhoneNumber: data.phoneNumber,
      Email: data.email,
      CompletionDate: completionDate,
      Timestamp: new Date().toISOString(),
      FormType: "claimcert",
    };

    try {
      // Send to API route which handles Google Sheets submission
      const apiResponse = await fetch("/api/claimcert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const apiData = await apiResponse.json();
      console.log("ClaimCert API response:", apiData);

      // Also send to Web3Form
      const web3formAccessKey =
        process.env.NEXT_PUBLIC_CLAIMCERT_WEB3FORMS_ACCESS_KEY || "";
      const web3formResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formAccessKey,
          ...payload,
        }),
      });

      const web3formData = await web3formResponse.json();
      console.log("Web3Form response:", web3formData);

      if (!web3formResponse.ok) {
        console.warn("Web3Form submission failed:", web3formData);
      }

      // Check API response for success
      if (!apiResponse.ok) {
        throw new Error(
          apiData.message || `Server error: ${apiResponse.status}`,
        );
      }

      if (apiData.status === "success") {
        setResult(
          "Thank you! Your certificate request has been submitted successfully.",
        );
      } else {
        throw new Error(apiData.message || "Submission failed");
      }

      setTimeout(() => {
        reset();
        setResult("");
        onClose();
      }, 1500);
    } catch (error) {
      console.error("ClaimCert form error:", error);
      setResult("An error occurred while submitting. Please try again later.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-white relative w-full max-w-[830px] rounded-[9px] shadow-2xl max-h-screen overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              <div className="p-6 md:p-8 lg:p-10">
                <Frame />

                <div className="mt-8 space-y-6">
                  <Frame2
                    fullNameProps={register("fullName")}
                    phoneNumberProps={register("phoneNumber")}
                    fullNameError={errors.fullName?.message}
                    phoneNumberError={errors.phoneNumber?.message}
                  />

                  <Container4
                    {...register("email")}
                    emailError={errors.email?.message}
                  />

                  <Frame3 />

                  <DateFields
                    day={watch("day")}
                    setDay={(v: string) => setValue("day", v, { shouldValidate: true })}
                    month={watch("month")}
                    setMonth={(v: string) => setValue("month", v, { shouldValidate: true })}
                    year={watch("year")}
                    setYear={(v: string) => setValue("year", v, { shouldValidate: true })}
                    dayError={errors.day?.message}
                    monthError={errors.month?.message}
                    yearError={errors.year?.message}
                  />

                  <div className="flex justify-center mt-8">
                    <Cta
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    />
                  </div>

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center py-4 px-6 rounded-xl mt-4 ${
                        result.includes("Thank you")
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {result}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function CertificateForm() {
  return null;
}

export { CertificateFormModal };
