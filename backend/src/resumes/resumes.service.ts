import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Job } from '@prisma/client';
import pdfParse = require('pdf-parse');
import * as mammoth from 'mammoth';

// Interface to hold the job data plus our calculated match info
interface JobWithMatchInfo extends Job {
  matchingSkills: string[];
  matchPercentage: number;
}

interface ScoreBreakdown {
  name: string;
  score: number;
  maxScore: number;
}

@Injectable()
export class ResumesService {
  constructor(private prisma: PrismaService) {}

  private analyzeResumeText(text: string): { score: number; suggestions: string[]; breakdown: ScoreBreakdown[] } {
    const suggestions: string[] = [];
    const breakdown: ScoreBreakdown[] = [];
    const lowerCaseText = text.toLowerCase();
    
    let totalScore = 0;

    const wordCount = text.split(/\s+/).length;
    let wordCountScore = 25;
    if (wordCount < 400 || wordCount > 600) {
      wordCountScore = 10;
      suggestions.push(`Your resume is ${wordCount} words long. Aim for a concise length of 400-600 words.`);
    }
    totalScore += wordCountScore;
    breakdown.push({ name: 'Conciseness', score: wordCountScore, maxScore: 25 });

    const requiredSections = ['education', 'experience', 'skills'];
    const foundSections = requiredSections.filter(s => lowerCaseText.includes(s)).length;
    const sectionsScore = Math.round((foundSections / requiredSections.length) * 25);
    if (sectionsScore < 25) {
      const missing = requiredSections.filter(s => !lowerCaseText.includes(s));
      suggestions.push(`Your resume appears to be missing key sections: ${missing.join(', ')}.`);
    }
    totalScore += sectionsScore;
    breakdown.push({ name: 'Structure', score: sectionsScore, maxScore: 25 });

    const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'achieved'];
    const verbsFound = actionVerbs.filter(verb => lowerCaseText.includes(verb)).length;
    let verbsScore = 25;
    if (verbsFound < 3) {
      verbsScore = 10;
      suggestions.push('Use more powerful action verbs to describe your accomplishments.');
    }
    totalScore += verbsScore;
    breakdown.push({ name: 'Impact', score: verbsScore, maxScore: 25 });
    
    let quantifiableScore = 25;
    if (!/\d/.test(text) || !/[%&$]/.test(text)) {
      quantifiableScore = 10;
      suggestions.push('Include measurable results with numbers or percentages to quantify achievements.');
    }
    totalScore += quantifiableScore;
    breakdown.push({ name: 'Quantifiability', score: quantifiableScore, maxScore: 25 });

    return { score: totalScore, suggestions, breakdown };
  }

  async createResume(file: Express.Multer.File, userId: string) {
    let parsedText: string;
    try {
      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(file.buffer);
        parsedText = data.text;
      } else if (
        file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const { value } = await mammoth.extractRawText({ buffer: file.buffer });
        parsedText = value;
      } else {
        throw new BadRequestException('Unsupported file type.');
      }
    } catch (error) {
      throw new BadRequestException('Failed to parse file.');
    }

    if (!parsedText || parsedText.trim().length === 0) {
      throw new BadRequestException('Could not extract text from file.');
    }

    const { score, suggestions, breakdown } = this.analyzeResumeText(parsedText);

    const newResume = await this.prisma.resume.create({
      data: {
        filename: file.originalname,
        parsedText,
        score,
        suggestions,
        scoreBreakdown: breakdown as any,
        userId: userId,
      },
    });
    
    return newResume;
  }
  
  async findOne(id: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID "${id}" not found.`);
    }
    
    return resume;
  }

  // --- THIS IS THE UPGRADED "BRAIN" ---
  private extractSkillsFromText(text: string): string[] {
    const lowerCaseText = text.toLowerCase();
    
    const potentialSkills = [
      // Tech
      'react', 'typescript', 'css', 'html', 'next.js', 'node.js', 'nestjs', 
      'postgresql', 'docker', 'prisma', 'kubernetes', 'aws', 'ci/cd', 
      'javascript', 'python', 'java', 'tensorflow', 'machine learning', 'selenium',
      'cypress', 'jest', 'swift', 'swiftui', 'xcode', 'ios sdk',

      // Healthcare
      'patient care', 'phlebotomy', 'nursing', 'bls', 'acls', 'ehr', 
      'patient vitals', 'hipaa', 'medical terminology',

      // Design
      'figma', 'adobe xd', 'user research', 'prototyping', 'adobe photoshop',
      'adobe illustrator', 'typography', 'adobe premiere pro', 'after effects',
      'color grading', 'blender', 'maya', '3d modeling', 'texturing',

      // Business & Admin
      'agile', 'scrum', 'jira', 'seo', 'google analytics', 'content marketing',
      'quickbooks', 'excel', 'financial reporting', 'gaap', 'recruiting',
      'onboarding', 'hr policies', 'employee relations', 'zendesk', 'customer service',
      'problem solving', 'data analysis', 'sql', 'process improvement', 'salesforce',
      'lead generation', 'cold calling', 'requirements gathering',

      // --- NEW: Expanded Neurology & Related Medical Skills ---
      'eeg', 'eeg interpretation', 'electroencephalogram', 'neurodiagnostics',
      'cognitive assessment', 'neurosurgery assistance', 'epilepsy monitoring',
      'seizure monitoring', 'sleep technology', 'polysomnography', 'sleep studies',
      'patient monitoring', 'clinical procedures', 'data acquisition', 'neuroimaging',
      'surgical instruments', 'sterile technique'
    ];
    
    const foundSkills = new Set<string>();
    
    potentialSkills.forEach(skill => {
        const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'gi');
        if (lowerCaseText.match(regex)) {
            const displayName = skill
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                .join(' ');
            foundSkills.add(displayName);
        }
    });

    return Array.from(foundSkills);
  }

  async findJobMatches(id: string) {
    const resume = await this.findOne(id);
    const resumeSkills = this.extractSkillsFromText(resume.parsedText);
    const allJobs = await this.prisma.job.findMany();

    const jobMatches = allJobs
      .map((job: Job) => {
        if (!job.requiredSkills || job.requiredSkills.length === 0) {
          return { ...job, matchingSkills: [], matchPercentage: 0 };
        }
        const matchingSkills = job.requiredSkills.filter((skill: string) => 
          resumeSkills.some(rs => rs.toLowerCase() === skill.toLowerCase())
        );
        const matchPercentage = (matchingSkills.length / job.requiredSkills.length) * 100;
        return {
          ...job,
          matchingSkills,
          matchPercentage: Math.round(matchPercentage),
        };
      })
      .filter((job: JobWithMatchInfo) => job.matchPercentage > 0)
      .sort((a: JobWithMatchInfo, b: JobWithMatchInfo) => b.matchPercentage - a.matchPercentage);

    return jobMatches;
  }

  async findAllForUser(userId: string) {
    return this.prisma.resume.findMany({
      where: { userId },
      select: {
        id: true,
        filename: true,
        score: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID "${id}" not found.`);
    }

    if (resume.userId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this resume.');
    }

    return this.prisma.resume.delete({
      where: { id },
    });
  }
}

