
import React from 'react';
import { 
  Activity, 
  Wind, 
  Leaf, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Smile, 
  Droplets,
  Flower2,
  Stethoscope,
  Sparkles,
  Users,
  Compass,
  Zap
} from 'lucide-react';
import { Service, CaseStudy, ClinicTiming, TimelineEvent, PhilosophyPillar, Testimonial, FAQItem } from './types';

export const CLINIC_NAME = "Alsafa Homoeo Clinic";
export const DOCTOR_1_NAME = "Dr. Shakir Sayyad";
export const DOCTOR_2_NAME = "Dr. Shabnam Sayyad";
export const DOCTOR_QUAL = "M.D. (Homeopathy)";
export const PHONE_NUMBER = "+1234567890";
export const WHATSAPP_NUMBER = "1234567890";
export const CLINIC_ADDRESS = "124 Healing Avenue, Serenity Springs, Garden City, 56001";
export const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I would like to book a homeopathy appointment.");
export const WHATSAPP_INQUIRY_MESSAGE = encodeURIComponent("Hello Dr. Sayyad, I have a query regarding a health condition not listed on your website. Could you please guide me?");

export const DOCTORS = [
  {
    name: DOCTOR_1_NAME,
    qual: DOCTOR_QUAL,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    philosophy: "Focusing on deep-acting constitutional remedies to restore the vital force and achieve permanent recovery."
  },
  {
    name: DOCTOR_2_NAME,
    qual: DOCTOR_QUAL,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
    philosophy: "I believe in gentle, holistic healing that respects the unique physical and emotional blueprint of every patient."
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2003",
    title: "The Foundation",
    milestone: "First Clinical Step",
    patients: "5,000+",
    story: "Initial years were dedicated to pediatric care and acute ailments. I learned that a child's rapid response to homeopathy is the purest evidence of the vital force's power."
  },
  {
    year: "2010",
    title: "Specialized Focus",
    milestone: "Chronic Care Mastery",
    patients: "12,000+",
    story: "Shifted focus to chronic respiratory and skin disorders. This period was defined by treating 'untreatable' cases of asthma and psoriasis, proving that nature holds the key to deep healing."
  },
  {
    year: "2018",
    title: "Alsafa Vision",
    milestone: "Holistic Wellness Center",
    patients: "22,000+",
    story: "Established our current center to integrate emotional health with physical recovery. We began handling complex lifestyle diseases and hormonal imbalances with a multi-dimensional approach."
  },
  {
    year: "Today",
    title: "Constitutional Legacy",
    milestone: "Advanced Pathology",
    patients: "30,000+",
    story: "Today, our practice specializes in advanced constitutional prescribing. We treat the person, not the label, restoring balance in patients who have tried every other system of medicine."
  }
];

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    title: "Root-Cause Treatment",
    description: "We don't merely chase symptoms. We dig deep into the genetic, emotional, and physical triggers to ensure the illness doesn't return.",
    icon: <Compass className="w-6 h-6" />
  },
  {
    title: "The Vital Force",
    description: "Homeopathy works by stimulating your body's inherent energy. We provide the spark that allows your immune system to finish the job.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Restoration over Suppression",
    description: "Conventional medicines often push disease deeper. Our remedies encourage the body to express and release toxins naturally.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "Individualized Healing",
    description: "Your story is unique. Your medicine should be too. We prescribe based on your specific physical and emotional blueprint.",
    icon: <Users className="w-6 h-6" />
  }
];

export const SERVICES: Service[] = [
  {
    id: "skin",
    title: "Skin Disorders",
    description: "Safe treatment for Acne, Eczema, Psoriasis, and chronic skin allergies.",
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: "allergies",
    title: "Allergies & Asthma",
    description: "Building long-term immunity against environmental and seasonal allergies.",
    icon: <Wind className="w-8 h-8" />
  },
  {
    id: "digestive",
    title: "Digestive Health",
    description: "Holistic care for Acidity, IBS, Gastritis, and chronic constipation.",
    icon: <Droplets className="w-8 h-8" />
  },
  {
    id: "hair",
    title: "Hair & Scalp",
    description: "Effective solutions for Hair Fall, Dandruff, and Alopecia.",
    icon: <Leaf className="w-8 h-8" />
  },
  {
    id: "women",
    title: "Women's Health",
    description: "Support for PCOD, hormonal imbalances, and menstrual concerns.",
    icon: <Flower2 className="w-8 h-8" />
  },
  {
    id: "child",
    title: "Child Immunity",
    description: "Gentle medicine to improve recurring colds, coughs, and growth.",
    icon: <Heart className="w-8 h-8" />
  },
  {
    id: "stress",
    title: "Mental Wellness",
    description: "Natural relief for Stress, Anxiety, and Sleep Disorders.",
    icon: <Smile className="w-8 h-8" />
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "“I’ve already tried many treatments. Why should I trust homeopathy now?”",
    answer: "Many patients come after trying multiple treatments. Homeopathy works differently by focusing on the root cause and individual body response, not just temporary symptom relief."
  },
  {
    question: "“My reports are normal, but I still don’t feel well. Why?”",
    answer: "Many issues exist before they appear in reports. Homeopathy treats functional imbalances and overall well-being, not just test results."
  },
  {
    question: "“My problem keeps coming back even after treatment. Why?”",
    answer: "Recurrence usually means the root cause wasn’t addressed. Homeopathy works to strengthen the body’s natural healing response."
  },
  {
    question: "“Is homeopathy very slow? I don’t want to wait forever.”",
    answer: "Recovery speed depends on the duration and nature of the illness. Some relief may appear early, while complete healing takes consistent treatment."
  },
  {
    question: "“I have PCOD / thyroid and my weight keeps increasing. Can homeopathy help?”",
    answer: "Homeopathy aims to balance hormones and metabolism while supporting long-term health, not just controlling reports."
  },
  {
    question: "“Why does my skin problem improve and then come back again?”",
    answer: "Skin conditions often reflect internal imbalance. Lasting improvement happens when the internal cause is treated, not just the surface symptoms."
  },
  {
    question: "“Can emotional stress really cause physical illness?”",
    answer: "Yes. Long-term stress can affect digestion, sleep, immunity, and hormones. Homeopathy considers mental and emotional health as part of healing."
  },
  {
    question: "“Why does the doctor ask so many personal questions?”",
    answer: "Homeopathy is personalized. Understanding lifestyle, stress, sleep, and habits helps select the most suitable medicine for each patient."
  },
  {
    question: "“Will I need to take medicines for life?”",
    answer: "The goal is not dependency. As health stabilizes, medicines are gradually reduced under medical supervision."
  },
  {
    question: "“Is homeopathy safe? Are there side effects?”",
    answer: "When prescribed by a qualified doctor, homeopathy is gentle and safe for children, adults, and elderly patients."
  }
];

export const BENEFITS = [
  {
    title: "Natural & Gentle",
    description: "No harsh chemicals. Our medicines stimulate your body's own healing response.",
    icon: <Leaf className="w-6 h-6" />
  },
  {
    title: "Zero Side Effects",
    description: "Safe for all ages, from newborns to the elderly, without any adverse reactions.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Root Cause Treatment",
    description: "We don't just mask symptoms; we treat the underlying cause of your illness.",
    icon: <Activity className="w-6 h-6" />
  },
  {
    title: "Long-term Relief",
    description: "Focus on permanent recovery and strengthening overall immunity.",
    icon: <Clock className="w-6 h-6" />
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs1",
    condition: "Chronic Psoriasis",
    historyDuration: "10 Years",
    treatmentDuration: "14 Months",
    outcome: "Complete clearance of plaques. Skin texture restored without dependence on steroids. No relapse in 2 years of follow-up.",
    patientInfo: "A.R., 34 Male",
    improvementLevel: 95,
    doctorsInsight: "Skin conditions often mirror internal stress and digestive health. Healing requires patience as the body resets its inflammatory response at a cellular level."
  },
  {
    id: "cs2",
    condition: "Migraine & Sinusitis",
    historyDuration: "6 Years",
    treatmentDuration: "9 Months",
    outcome: "Intensity and frequency of attacks reduced by 90%. Patient has successfully stopped daily use of analgesics and anti-inflammatory drugs.",
    patientInfo: "V.S., 28 Female",
    improvementLevel: 92,
    doctorsInsight: "Chronic headaches are often tied to constitutional sensitivities. We focus on desensitizing the patient to triggers while improving the vascular stability of the cranial nerves."
  },
  {
    id: "cs3",
    condition: "PCOS & Irregularity",
    historyDuration: "2 Years",
    treatmentDuration: "12 Months",
    outcome: "Cycles regularized within 4 months. Follow-up ultrasound confirmed a significant reduction in cystic volume. Improved overall energy and skin health.",
    patientInfo: "R.M., 24 Female",
    improvementLevel: 88,
    doctorsInsight: "Homeopathy addresses hormonal disruption at its source—the pituitary-ovarian axis. It stimulates the body's own corrective mechanisms rather than providing synthetic hormones."
  },
  {
    id: "cs4",
    condition: "Recurrent Tonsillitis",
    historyDuration: "4 Years",
    treatmentDuration: "6 Months",
    outcome: "Frequency of attacks reduced from monthly to zero. Significant improvement in overall pediatric immunity and growth.",
    patientInfo: "M.K., 7 Female",
    improvementLevel: 90,
    doctorsInsight: "In children, we aim to strengthen the defense mechanism rather than suppress symptoms. A child's vitality usually recovers rapidly once the right constitutional remedy is found."
  },
  {
    id: "cs5",
    condition: "Allergic Rhinitis",
    historyDuration: "5 Years",
    treatmentDuration: "7 Months",
    outcome: "Patient reports complete cessation of early morning sneezing and watery eyes. No longer dependent on antihistamines during seasonal changes.",
    patientInfo: "D.K., 41 Male",
    improvementLevel: 94,
    doctorsInsight: "Allergies indicate an overactive immune response. Our medicines work to retrain the immune system to recognize harmless environmental factors correctly."
  },
  {
    id: "cs6",
    condition: "Kidney Stones (Renal Calculi)",
    historyDuration: "6 Months (Recurrent)",
    treatmentDuration: "4 Months",
    outcome: "Pain-free passage of a 6mm stone observed in second month. Follow-up scans show no new stone formation and healthy kidney function.",
    patientInfo: "H.G., 38 Male",
    improvementLevel: 85,
    doctorsInsight: "Beyond passing the stone, the goal is to correct the metabolic imbalance (lithogenic tendency) that causes stone formation in the first place."
  },
  {
    id: "cs7",
    condition: "Anxiety & Insomnia",
    historyDuration: "3 Years",
    treatmentDuration: "8 Months",
    outcome: "Natural sleep cycle restored. Significant reduction in panic triggers. Patient successfully transitioned off temporary sedatives.",
    patientInfo: "S.P., 29 Female",
    improvementLevel: 85,
    doctorsInsight: "Emotional health is deeply intertwined with physical rhythm. By restoring the sleep cycle naturally, we provide the brain with the recovery time it needs to manage stressors."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    condition: "Severe Migraine",
    comment: "I had suffered from migraines for over 5 years. After 6 months of treatment at Alsafa, the frequency has reduced significantly. Dr. Sayyad's approach is very thorough.",
    rating: 5
  },
  {
    id: "t2",
    name: "Sneha Patil",
    condition: "Childhood Asthma",
    comment: "My son's breathing issues have improved so much. He no longer needs his inhaler daily. Truly grateful for the gentle healing.",
    rating: 5
  },
  {
    id: "t3",
    name: "Amit Sharma",
    condition: "Gastritis",
    comment: "Excellent results for my chronic stomach issues. Highly recommended for anyone looking for holistic care.",
    rating: 5
  }
];

export const CLINIC_TIMINGS: ClinicTiming[] = [
  { days: "Mon - Sat (Morning)", morning: "09:30 AM - 01:30 PM", evening: "Closed" },
  { days: "Mon - Sat (Evening)", morning: "Closed", evening: "05:30 PM - 09:00 PM" },
  { days: "Sundays", morning: "Closed", evening: "Closed" }
];
