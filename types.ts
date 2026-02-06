
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CaseStudy {
  id: string;
  condition: string;
  historyDuration: string;
  treatmentDuration: string;
  outcome: string;
  patientInfo: string; // e.g., "S.K., 45"
  improvementLevel: number; // 0-100 scale
  doctorsInsight: string; // Professional observation
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  condition: string;
  comment: string;
  rating: number;
}

export interface ClinicTiming {
  days: string;
  morning: string;
  evening: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  patients: string;
  story: string;
  milestone: string;
}

export interface PhilosophyPillar {
  title: string;
  description: string;
  icon: React.ReactNode;
}
