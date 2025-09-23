import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The large array of 31 mock jobs
const mockJobsData = [
  // Tech
  {
    title: 'Frontend Developer',
    company: 'InnovateTech',
    description: 'Developing responsive and modern user interfaces for our flagship products.',
    requiredSkills: ['React', 'TypeScript', 'CSS', 'HTML', 'Next.js'],
  },
  {
    title: 'Backend Engineer',
    company: 'Data Systems LLC',
    description: 'Building scalable and robust server-side applications using modern technologies.',
    requiredSkills: ['Node.js', 'NestJS', 'PostgreSQL', 'Docker', 'Prisma'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Creative Apps',
    description: 'Working on both the frontend and backend of our innovative platform.',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Prisma', 'CSS'],
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudFlow',
    description: 'Managing our cloud infrastructure and deployment pipelines on AWS.',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    title: 'Data Scientist',
    company: 'Analytics Corp',
    description: 'Analyzing large datasets to extract meaningful insights and build predictive models.',
    requiredSkills: ['Python', 'SQL', 'TensorFlow', 'Machine Learning'],
  },
  {
    title: 'iOS Developer',
    company: 'MobileFirst Solutions',
    description: 'Creating beautiful and performant applications for the Apple ecosystem.',
    requiredSkills: ['Swift', 'SwiftUI', 'Xcode', 'iOS SDK'],
  },
  {
    title: 'QA Automation Engineer',
    company: 'BugFree Inc.',
    description: 'Developing and maintaining automated test suites to ensure product quality.',
    requiredSkills: ['Selenium', 'Cypress', 'Jest', 'TypeScript'],
  },
  // Design
  {
    title: 'UI/UX Designer',
    company: 'Pixel Perfect Inc.',
    description: 'Designing intuitive and beautiful user experiences for web and mobile.',
    requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
  },
  {
    title: 'Graphic Designer',
    company: 'Creative Studio',
    description: 'Creating visually stunning graphics for marketing campaigns and brand identity.',
    requiredSkills: ['Adobe Photoshop', 'Adobe Illustrator', 'Typography'],
  },
  {
    title: 'Video Editor & Motion Graphics Artist',
    company: 'MotionReel',
    description: 'Editing video content and creating compelling motion graphics for digital platforms.',
    requiredSkills: ['Adobe Premiere Pro', 'After Effects', 'Color Grading'],
  },
  {
    title: '3D Artist',
    company: 'Polycount Creations',
    description: 'Modeling and texturing 3D assets for games and simulations.',
    requiredSkills: ['Blender', 'Maya', '3D Modeling', 'Texturing'],
  },
  // Healthcare
  {
    title: 'Registered Nurse (ER)',
    company: 'City Central Hospital',
    description: 'Providing high-quality patient care in the fast-paced emergency department.',
    requiredSkills: ['Patient Care', 'BLS', 'ACLS', 'EHR'],
  },
  {
    title: 'Medical Assistant',
    company: 'Community Health Clinic',
    description: 'Assisting physicians with patient examinations and administrative tasks.',
    requiredSkills: ['Phlebotomy', 'Patient Vitals', 'Medical Terminology', 'HIPAA'],
  },
  // --- Neurology Roles ---
  {
    title: 'EEG Technologist',
    company: 'NeuroDiagnostics Center',
    description: 'Performing electroencephalographic (EEG) tests to detect abnormalities in brain wave patterns.',
    requiredSkills: ['EEG', 'Patient Monitoring', 'Clinical Procedures', 'Data Acquisition'],
  },
  {
    title: 'Clinical Neurophysiologist',
    company: 'Brain Health Institute',
    description: 'Interpreting neurophysiological data, including EEG and evoked potentials, to diagnose neurological disorders.',
    requiredSkills: ['EEG Interpretation', 'Neurodiagnostics', 'Cognitive Assessment'],
  },
  {
    title: 'Neurosurgery Physician Assistant',
    company: 'Surgical Associates',
    description: 'Assisting neurosurgeons in the operating room and providing pre- and post-operative patient care.',
    requiredSkills: ['Neurosurgery Assistance', 'Surgical Instruments', 'Sterile Technique'],
  },
  {
    title: 'Sleep Technologist (Polysomnography)',
    company: 'Regional Sleep Center',
    description: 'Conducting overnight sleep studies to monitor patients for sleep disorders like apnea.',
    requiredSkills: ['Polysomnography', 'Sleep Studies', 'Patient Monitoring'],
  },
  // Business & Admin
  {
    title: 'Project Manager',
    company: 'Solutions Group',
    description: 'Leading cross-functional teams to deliver projects on time and within budget.',
    requiredSkills: ['Agile', 'Scrum', 'Project Planning', 'JIRA'],
  },
  {
    title: 'Marketing Coordinator',
    company: 'Growth Co.',
    description: 'Developing and executing digital marketing campaigns across multiple channels.',
    requiredSkills: ['SEO', 'Google Analytics', 'Content Marketing'],
  },
  {
    title: 'Accountant',
    company: 'Finance Partners',
    description: 'Managing financial records, preparing reports, and ensuring compliance.',
    requiredSkills: ['QuickBooks', 'Excel', 'Financial Reporting', 'GAAP'],
  },
  {
    title: 'Human Resources Generalist',
    company: 'People First Inc.',
    description: 'Handling various HR functions including recruiting, onboarding, and employee relations.',
    requiredSkills: ['Recruiting', 'Onboarding', 'HR Policies'],
  },
  {
    title: 'Customer Support Specialist',
    company: 'HelpDesk Pro',
    description: 'Providing timely and friendly support to our customers via email and chat.',
    requiredSkills: ['Zendesk', 'Customer Service', 'Problem Solving'],
  },
  {
    title: 'Operations Analyst',
    company: 'Efficient Logistics',
    description: 'Analyzing business operations to identify areas for improvement and efficiency.',
    requiredSkills: ['Data Analysis', 'Excel', 'SQL', 'Process Improvement'],
  },
  {
    title: 'Sales Development Representative',
    company: 'LeadGen Experts',
    description: 'Identifying and qualifying new sales leads through outbound calls and emails.',
    requiredSkills: ['Salesforce', 'Lead Generation', 'Cold Calling'],
  },
  {
    title: 'Business Analyst',
    company: 'TechFlow Solutions',
    description: 'Bridging the gap between business stakeholders and the IT team to define project requirements.',
    requiredSkills: ['Requirements Gathering', 'SQL', 'Agile'],
  },
  // More Data...
  {
    title: 'IT Support Technician',
    company: 'StableNet IT',
    description: 'Providing technical assistance and troubleshooting for hardware and software issues.',
    requiredSkills: ['Active Directory', 'Troubleshooting', 'Customer Service'],
  },
  {
    title: 'Content Writer',
    company: 'WordSmith Agency',
    description: 'Writing clear, compelling copy for various mediums including blogs and websites.',
    requiredSkills: ['Copywriting', 'SEO', 'Content Strategy'],
  },
  {
    title: 'Social Media Manager',
    company: 'Viral Vibe',
    description: 'Managing and growing our brand’s presence across all social media platforms.',
    requiredSkills: ['Social Media Marketing', 'Content Creation', 'Community Management'],
  },
  {
    title: 'Financial Advisor',
    company: 'WealthSecure',
    description: 'Providing clients with financial advice and strategies for investment and retirement planning.',
    requiredSkills: ['Financial Planning', 'Investment Management', 'Client Relations'],
  },
  {
    title: 'Paralegal',
    company: 'Legal Eagle Firm',
    description: 'Assisting lawyers by preparing legal documents and conducting research.',
    requiredSkills: ['Legal Research', 'Document Drafting', 'Case Management'],
  },
  {
    title: 'Web Content Manager',
    company: 'Digital Presence Co.',
    description: 'Overseeing the content on our company website, ensuring it is up-to-date and engaging.',
    requiredSkills: ['CMS', 'SEO', 'Content Editing'],
  },
];

async function main() {
  console.log('Start seeding...');
  
  // This will first delete all old jobs to ensure a clean slate
  await prisma.job.deleteMany({});
  console.log('Old jobs deleted.');

  // --- THE FIX: We now add the URL to each job before creating it ---
  const jobsWithUrls = mockJobsData.map(job => {
    // This creates a URL-friendly version of the job title (e.g., "Frontend Developer" -> "Frontend%20Developer")
    const encodedTitle = encodeURIComponent(job.title);
    return {
      ...job,
      url: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}`
    };
  });

  for (const job of jobsWithUrls) {
    const newJob = await prisma.job.create({
      data: job, // 'job' now contains the 'url' property
    });
    console.log(`Created job: ${newJob.title}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
