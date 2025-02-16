"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Phone,
  ArrowRight,
  MapPin,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { submitForm } from "../lib/submitForm";

function ContactItem({
  item,
}: {
  item: { icon: any; label: string; value: string; href: string | null };
}) {
  return (
    <div className="relative flex items-center space-x-6 p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-white/10">
          <item.icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-sm text-indigo-200">{item.label}</p>
        <p className="text-white font-medium">{item.value}</p>
      </div>
      {item.href && (
        <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white" />
      )}
    </div>
  );
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    company: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.contact || !formState.description) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitForm(formState);

      // Reset form
      setFormState({ name: "", contact: "", company: "", description: "" });

      // Show success state
      setIsSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                  Let's create something
                </span>
                <br />
                <span className="text-white">Extraordinary</span>
              </h2>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "contact@xouston.com",
                    href: "mailto:contact@xouston.com",
                  },
                  {
                    icon: MessageSquare,
                    label: "Telegram",
                    value: "@Xouston_Contact",
                    href: "https://t.me/Xouston_Contact",
                  },
                  {
                    icon: Globe,
                    label: "Working Hours",
                    value: "Support 24/7",
                    href: null,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <ContactItem item={item} />
                      </a>
                    ) : (
                      <ContactItem item={item} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-xl blur-2xl" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-8">
              <div className="min-h-[400px] flex items-center">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 w-full"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message sent!
                    </h3>
                    <p className="text-indigo-200">
                      We will contact you shortly
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6 w-full"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {[
                        {
                          label: "Name",
                          value: "name",
                          placeholder: "How should we address you?",
                        },
                        {
                          label: "Contact",
                          value: "contact",
                          placeholder: "Telegram/Email/Phone",
                        },
                        {
                          label: "Company",
                          value: "company",
                          placeholder: "If there's no name yet, no problem",
                          className: "sm:col-span-2",
                        },
                      ].map((field) => (
                        <div key={field.value} className={field.className}>
                          <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            required={field.value !== "company"}
                            value={
                              formState[field.value as keyof typeof formState]
                            }
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                [field.value]: e.target.value,
                              })
                            }
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 
                              rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none 
                              text-white placeholder-white/50 text-sm sm:text-base shadow-lg 
                              transition-all hover:bg-white/15"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}

                      <div className="sm:col-span-2">
                        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1">
                          Describe your idea
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formState.description}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 
                            rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none
                            text-white placeholder-white/50 text-sm sm:text-base shadow-lg 
                            transition-all hover:bg-white/15"
                          placeholder="Tell us in general terms, we'll discuss details personally..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full group relative mt-4 sm:mt-6 ${
                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium text-sm sm:text-base">
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
