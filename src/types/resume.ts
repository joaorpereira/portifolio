export interface Basics {
  name: string;
  label: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  /** Public path e.g. /images/profile.jpg */
  profileImage?: string | null;
  /** Public path e.g. /resume.pdf */
  resumePdf?: string;
}

export interface ExperienceProject {
  name: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
  projects?: ExperienceProject[];
}

export interface Education {
  degree: string;
  institution: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface PortfolioProject {
  name: string;
  company?: string;
  period?: string;
  summary?: string;
  /** Thumbnail for home and project cards; public path or absolute URL */
  image?: string | null;
  /** Demo: YouTube/Vimeo URL or direct .mp4/.webm path */
  video?: string | null;
  technologies: string[];
  highlights: string[];
  links?: {
    live?: string;
    repo?: string;
  };
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Resume {
  basics: Basics;
  skills: string[];
  skillCategories: SkillCategory[];
  projects: PortfolioProject[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  languages: Language[];
}
