import { useState } from 'react';
import { Linkedin, MessageCircle, Github, Mail, Send, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 text-center bg-gradient-to-r from-white to-blue-50">
        <Mail className="absolute h-12 w-12 text-primary/20 top-1/4 left-1/4 animate-float" />
        <MessageCircle className="absolute h-16 w-16 text-primary/20 bottom-1/4 right-1/4 animate-float animation-delay-1000" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Get in Touch
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-body">
            We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface p-8 sm:p-12 rounded-lg shadow-md border border-gray-200">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-heading">Message Sent!</h3>
                  <p className="text-text-body mt-2">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-heading">Name</label>
                      <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 bg-background border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-heading">Email</label>
                      <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-background border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text-heading">Message</label>
                      <textarea id="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-background border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"></textarea>
                    </div>
                    <div>
                      <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105 flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" /> Send Message
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-3 text-text-body">
              <Mail className="h-5 w-5" />
              <span>support@resuemay.com</span>
            </div>
            {/* --- UPDATED LINKS --- */}
            <div className="flex justify-center mt-6 space-x-6">
              <a href="https://www.linkedin.com/in/abdul-mueed-551713245" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform"><Linkedin /></a>
              <a href="https://wa.me/+923376006030" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform"><MessageCircle /></a>
              <a href="https://github.com/Mueed96" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform"><Github /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}