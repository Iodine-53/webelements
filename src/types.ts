export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technicalDetails: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
  color: string;
  accentColor: string;
  role: string;
  year: string;
}

export interface DesignerInfo {
  name: string;
  title: string;
  bio: string;
  philosophy: string;
  location: string;
  timezone: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  skills: {
    design: string[];
    development: string[];
    tools: string[];
  };
}
