import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/FeatureCard';
import { BarChart, FileCheck, Search } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

export function LandingPage() {
  const handleScrollToCta = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="pt-12 sm:pt-16 pb-20 sm:pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div variants={sectionVariants} className="text-center lg:text-left">
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-heading tracking-tight">
              Turn Your <span className="text-primary">Resume</span> Into Opportunities.
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-base sm:text-lg text-text-body max-w-2xl mx-auto lg:mx-0">
              ResueMay is a modern SaaS platform that analyzes, scores, and improves resumes with instant feedback and tailored job matches to help users unlock better opportunities.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex gap-4 justify-center lg:justify-start">
              <button
                onClick={handleScrollToCta}
                className="inline-block bg-primary text-white font-bold text-lg px-8 py-3 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Column: Illustration */}
          <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.2 }} className="relative hidden lg:flex items-center justify-center p-4">
            <img 
              src="/decorative-elements.svg" 
              alt="Decorative background elements" 
              className="absolute inset-0 w-full h-full object-contain animate-float z-10"
            />
            <img 
              src="/main-illustration.svg" 
              alt="Main resume graphic" 
              className="relative z-20 max-w-full max-h-full w-auto mx-auto object-contain"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 sm:py-24 bg-surface border-y border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            {/* --- UPDATED BRANDING --- */}
            <h2 className="text-3xl font-bold text-text-heading">Why ResueMay?</h2>
            <p className="mt-4 text-lg text-text-body">Go from draft to dream job with powerful insights.</p>
          </motion.div>
          <motion.div variants={sectionVariants} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}><FeatureCard icon={FileCheck} title="Instant Analysis" description="Get an objective score based on key metrics like word count, action verbs, and structure." /></motion.div>
            <motion.div variants={itemVariants}><FeatureCard icon={BarChart} title="Resume Score" description="Visualize your resume's strengths and weaknesses with a clear, animated score and breakdown." /></motion.div>
            <motion.div variants={itemVariants}><FeatureCard icon={Search} title="Automated Job Matching" description="Our system intelligently finds jobs you're a perfect match for based on the skills in your resume." /></motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        id="cta-section"
        className="py-20 sm:py-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-text-heading">Ready to Land Your Next Role?</motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-text-body">Stop waiting for callbacks. Start improving your resume today.</motion.p>
          <motion.div variants={buttonVariants} className="mt-8">
            <Link
              to="/upload"
              className="inline-block bg-primary text-white font-bold text-lg px-10 py-4 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105"
            >
              Start for Free
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}