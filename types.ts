import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactCardData {
  name: string;
  role: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  summary?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
  attachment?: string; // Base64 string of the image
  cardData?: ContactCardData; // Structured data if the AI parsed a contact card
}