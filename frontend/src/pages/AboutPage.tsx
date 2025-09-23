import { FeatureCard } from '../components/FeatureCard';
import { SectionDivider } from '../components/SectionDivider';
import { HowItWorksStep } from '../components/HowItWorksStep';
import { Target, Zap, Users } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.5, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function AboutPage() {
  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 sm:py-24 bg-gradient-to-r from-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
              About ResueMay
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-body">
              Helping you turn your resume into opportunities.
            </p>
          </motion.div>
          {/* --- THIS IS THE UPDATED ILLUSTRATION --- */}
          <motion.div variants={itemVariants} transition={{ delay: 0.2 }}>
            <img 
              src="/about-illustration.svg" 
              alt="About ResueMay Illustration"
              className="max-w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Statement Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-4">Our Mission</h2>
          <p className="text-lg text-text-body">
            ResueMay was founded on a simple belief: everyone deserves a fair chance to land their dream job. Our mission is to democratize career coaching by providing instant, intelligent, and actionable feedback, empowering job seekers to present their best selves and unlock their full potential.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* How it Works Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 sm:py-24 bg-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-heading">How ResueMay Helps You</h2>
          </div>
          <motion.div variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div variants={itemVariants}><HowItWorksStep stepNumber={1} title="Upload Resume" description="Simply upload your current resume in PDF or DOCX format." /></motion.div>
            <motion.div variants={itemVariants}><HowItWorksStep stepNumber={2} title="Get Instant Score" description="Our engine analyzes your resume and provides a detailed score and breakdown." /></motion.div>
            <motion.div variants={itemVariants}><HowItWorksStep stepNumber={3} title="Improve & Apply" description="Use our suggestions to improve, then find jobs you're a perfect match for." /></motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Feature Highlight Cards (Example, if needed) */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-heading">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="AI-Powered Analysis"
              description="We use a rule-based engine to instantly analyze your resume against best practices."
            />
            <FeatureCard
              icon={Target}
              title="Actionable Feedback"
              description="Receive a clear score and personalized suggestions you can use to improve immediately."
            />
            <FeatureCard
              icon={Users}
              title="Tailored Job Matches"
              description="Our system matches your skills to real job descriptions, showing you the best opportunities."
            />
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <div className="text-center py-12 text-text-subtle">
        <p>Built with ❤️ by Abdul Mueed during the Final Phase of My Full-Stack Bootcamp.</p>
      </div>
    </div>
  );
}