import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'mr' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<Language, string>> = {
  // Header/Navigation
  'nav.home': { mr: 'मुख्यपृष्ठ', en: 'Home' },
  'nav.doctors': { mr: 'डॉक्टर', en: 'Doctors' },
  'nav.journey': { mr: 'प्रवास', en: 'Journey' },
  'nav.services': { mr: 'सेवा', en: 'Services' },
  'nav.about': { mr: 'आमच्याबद्दल', en: 'About' },
  'nav.stories': { mr: 'कथा', en: 'Stories' },
  'nav.whyUs': { mr: 'आम्ही का', en: 'Why Us' },
  'nav.gallery': { mr: 'गॅलरी', en: 'Gallery' },
  'nav.contact': { mr: 'संपर्क', en: 'Contact' },
  'nav.callNow': { mr: 'आता कॉल करा', en: 'Call Now' },
  'nav.bookAppointment': { mr: 'भेटीची वेळ बुक करा', en: 'Book Appointment' },
  
  // Hero Section
  'hero.badge': { mr: '१००% नैसर्गिक आणि समग्र काळजी', en: '100% Natural & Holistic Care' },
  'hero.clinicName': { mr: 'अलसफा होमिओ क्लिनिक', en: 'Alsafa Homoeo Clinic' },
  'hero.personalizedCare': { mr: 'वैयक्तिक संवैधानिक काळजी', en: 'Personalized constitutional care by' },
  'hero.callForAppointment': { mr: 'भेटीसाठी कॉल करा', en: 'Call for appointment' },
  'hero.whatsappInquiry': { mr: 'व्हाट्सअॅपवर चौकशी', en: 'Inquiry on WhatsApp' },
  'hero.casesTreated': { mr: '३०,०००+ प्रकरणे उपचारित', en: '30,000+ Cases Treated' },
  'hero.yearsLegacy': { mr: '२०+ वर्षांचा वारसा', en: '20+ Years Legacy' },
  'hero.treatingPerson': { mr: 'व्यक्तीवर उपचार,', en: 'Treating the Person,' },
  'hero.notSymptoms': { mr: 'फक्त लक्षणे नाही.', en: 'Not Just the Symptoms.' },
  'hero.expertCare': { mr: 'तज्ञ काळजी', en: 'Expert Care' },
  'hero.topRated': { mr: 'शीर्ष रेट केलेले', en: 'Top Rated' },
  'hero.scroll': { mr: 'स्क्रोल', en: 'Scroll' },
  
  // Healing Stories
  'stories.title': { mr: 'वास्तविक उपचार कथा', en: 'Real Healing Stories' },
  'stories.subtitle': { mr: 'व्यावसायिक होमिओपॅथिक काळजीची खोली आणि पद्धत दर्शविणाऱ्या प्रामाणिक केस स्टडीजचे सतत अवलोकन.', en: 'A continuous look at authentic case studies illustrating the depth and methodology of professional homeopathic care.' },
  'stories.caseStudy': { mr: 'केस स्टडी', en: 'Case Study' },
  'stories.history': { mr: 'इतिहास', en: 'History' },
  'stories.course': { mr: 'कोर्स', en: 'Course' },
  'stories.clinicalResult': { mr: 'क्लिनिकल परिणाम', en: 'Clinical Result' },
  'stories.better': { mr: 'चांगले', en: 'Better' },
  'stories.doctorInsight': { mr: 'डॉक्टरांचे अंतर्दृष्टी', en: "Doctor's Insight" },
  'stories.hoverToPause': { mr: 'काळजीपूर्वक वाचण्यासाठी कोणत्याही कार्डवर होव्हर करा', en: 'Hover over any card to pause and read carefully' },
  'stories.disclaimer': { mr: 'या कथा दस्तऐवजीकृत क्लिनिकल परिणाम आहेत. होमिओपॅथी वैयक्तिक ब्लूप्रिंटला संबोधित करते, प्रत्येक रुग्णासाठी पुनर्प्राप्तीचा एक अद्वितीय मार्ग सुनिश्चित करते.', en: 'These narratives are documented clinical outcomes. Homeopathy addresses the individual blueprint, ensuring a unique path to recovery for every patient.' },
  
  // Gallery
  'gallery.title': { mr: 'क्लिनिक गॅलरी', en: 'Clinic Gallery' },
  'gallery.subtitle': { mr: 'तुमच्या आराम आणि उपचारांसाठी डिझाइन केलेले स्वच्छ, उबदार आणि व्यावसायिक वातावरण.', en: 'A clean, warm, and professional environment designed for your comfort and healing.' },
  'gallery.viewMore': { mr: 'अधिक पहा', en: 'View More' },
  'gallery.viewLess': { mr: 'कमी पहा', en: 'View Less' },
  
  // Doctor Profile
  'doctors.title': { mr: 'आमच्या तज्ञ सल्लागारांना भेटा', en: 'Meet Our Expert Consultants' },
  
  // Services
  'services.title': { mr: 'उपचार केलेल्या स्थिती', en: 'Conditions Treated' },
  'services.subtitle': { mr: 'आम्ही सुरक्षित, नैसर्गिक औषधे वापरून तीव्र आणि जुनाट आरोग्य समस्यांच्या विस्तृत श्रेणीसाठी सर्वसमावेशक होमिओपॅथिक काळजी देतो.', en: 'We offer comprehensive homeopathic care for a wide range of acute and chronic health concerns using safe, natural medicines.' },
  'services.skinDisorders': { mr: 'त्वचा विकार', en: 'Skin Disorders' },
  'services.skinDesc': { mr: 'मुरुम, एक्जिमा, सोरायसिस आणि जुनाट त्वचा ऍलर्जीसाठी सुरक्षित उपचार.', en: 'Safe treatment for Acne, Eczema, Psoriasis, and chronic skin allergies.' },
  'services.allergies': { mr: 'ऍलर्जी आणि दमा', en: 'Allergies & Asthma' },
  'services.allergiesDesc': { mr: 'पर्यावरणीय आणि हंगामी ऍलर्जी विरुद्ध दीर्घकालीन प्रतिकारशक्ती निर्माण करणे.', en: 'Building long-term immunity against environmental and seasonal allergies.' },
  'services.digestive': { mr: 'पाचन आरोग्य', en: 'Digestive Health' },
  'services.digestiveDesc': { mr: 'आम्लपित्त, IBS, गॅस्ट्रायटिस आणि जुनाट बद्धकोष्ठतेसाठी समग्र काळजी.', en: 'Holistic care for Acidity, IBS, Gastritis, and chronic constipation.' },
  'services.hair': { mr: 'केस आणि टाळू', en: 'Hair & Scalp' },
  'services.hairDesc': { mr: 'केस गळणे, कोंडा आणि टक्कल पडण्यासाठी प्रभावी उपाय.', en: 'Effective solutions for Hair Fall, Dandruff, and Alopecia.' },
  'services.women': { mr: 'महिलांचे आरोग्य', en: "Women's Health" },
  'services.womenDesc': { mr: 'PCOD, हार्मोनल असंतुलन आणि मासिक पाळीच्या समस्यांसाठी समर्थन.', en: 'Support for PCOD, hormonal imbalances, and menstrual concerns.' },
  'services.child': { mr: 'बाल प्रतिकारशक्ती', en: 'Child Immunity' },
  'services.childDesc': { mr: 'वारंवार होणारी सर्दी, खोकला आणि वाढ सुधारण्यासाठी सौम्य औषध.', en: 'Gentle medicine to improve recurring colds, coughs, and growth.' },
  'services.mental': { mr: 'मानसिक निरोगीपणा', en: 'Mental Wellness' },
  'services.mentalDesc': { mr: 'तणाव, चिंता आणि झोपेच्या विकारांसाठी नैसर्गिक आराम.', en: 'Natural relief for Stress, Anxiety, and Sleep Disorders.' },
  'services.manyMore': { mr: 'आणखी बरेच...', en: 'Many More...' },
  'services.manyMoreDesc': { mr: 'तुमची स्थिती सूचीबद्ध दिसत नाही? आम्ही इतर अनेक आरोग्य समस्यांवर समग्रपणे उपचार करतो.', en: "Don't see your condition listed? We treat many other health issues holistically." },
  'services.inquireNow': { mr: 'आता चौकशी करा', en: 'Inquire Now' },
  'services.whatsappUs': { mr: 'आम्हाला व्हाट्सअॅप करा', en: 'WhatsApp Us' },
  
  // About
  'about.title': { mr: 'सहानुभूतीपूर्ण काळजी', en: 'Compassionate Care by' },
  'about.seniorConsultants': { mr: 'वरिष्ठ होमिओपॅथिक सल्लागार', en: 'Senior Homeopathic Consultants' },
  'about.description': { mr: 'अनेक वर्षांच्या समर्पित सरावासह, आम्ही संपूर्ण व्यक्तीवर उपचार करण्यावर विश्वास ठेवतो, केवळ रोगावर नाही. डॉ. शकीर आणि डॉ. शबनम सय्यद यांच्या नेतृत्वाखालील आमची टीम होमिओपॅथीला एक विज्ञान मानते जे चिरस्थायी आरोग्य आणण्यासाठी मूळ कारणाकडे - भावनिक, मानसिक किंवा शारीरिक - खोलवर पाहते.', en: 'With years of dedicated practice, we believe in treating the whole person, not just the disease. Our team, led by Dr. Shakir and Dr. Shabnam Sayyad, views homeopathy as a science that looks deep into the root cause—be it emotional, mental, or physical—to bring about lasting health.' },
  'about.patientCentric': { mr: 'रुग्ण केंद्रित', en: 'Patient Centric' },
  'about.patientCentricDesc': { mr: 'तुमची अनोखी कथा समजून घेण्यासाठी आम्ही काळजीपूर्वक ऐकतो.', en: 'We listen carefully to understand your unique story.' },
  'about.evidenceBased': { mr: 'पुरावा आधारित', en: 'Evidence Based' },
  'about.evidenceBasedDesc': { mr: 'शास्त्रीय होमिओपॅथिक तत्त्वे आणि आधुनिक संशोधन.', en: 'Classical homeopathic principles and modern research.' },
  'about.holistic': { mr: 'समग्र दृष्टीकोन', en: 'Holistic Approach' },
  'about.holisticDesc': { mr: 'मन, शरीर आणि भावना यांना संबोधित करणे.', en: 'Addressing mind, body, and emotions.' },
  'about.experienced': { mr: 'अनुभवी', en: 'Experienced' },
  'about.experiencedDesc': { mr: 'जटिल प्रकरणांमध्ये दशकांचे एकत्रित कौशल्य.', en: 'Decades of combined expertise in complex cases.' },
  'about.yearsExcellence': { mr: 'एकत्रित वर्षांची क्लिनिकल उत्कृष्टता', en: 'Combined years of clinical excellence' },
  
  // Philosophy
  'philosophy.title': { mr: 'आमचे तत्त्वज्ञान', en: 'Our Philosophy' },
  'philosophy.subtitle': { mr: 'आम्ही होमिओपॅथीला केवळ औषध म्हणून नाही तर जीवनाचा मार्ग म्हणून पाहतो - एक जो तुमच्या शरीराच्या नैसर्गिक बुद्धिमत्तेचा आदर करतो आणि चिरस्थायी आरोग्याची खरी क्षमता अनलॉक करतो.', en: "We see homeopathy not just as medicine, but as a way of life—one that respects your body's natural intelligence and unlocks the true potential for lasting health." },
  'philosophy.rootCause': { mr: 'मूळ कारण उपचार', en: 'Root-Cause Treatment' },
  'philosophy.rootCauseDesc': { mr: 'आम्ही केवळ लक्षणांचा पाठलाग करत नाही. आजार परत येणार नाही याची खात्री करण्यासाठी आम्ही अनुवांशिक, भावनिक आणि शारीरिक ट्रिगर्समध्ये खोलवर खोदतो.', en: "We don't merely chase symptoms. We dig deep into the genetic, emotional, and physical triggers to ensure the illness doesn't return." },
  'philosophy.vitalForce': { mr: 'जीवनशक्ती', en: 'The Vital Force' },
  'philosophy.vitalForceDesc': { mr: 'होमिओपॅथी तुमच्या शरीराच्या अंतर्निहित ऊर्जेला उत्तेजित करून कार्य करते. आम्ही ती ठिणगी प्रदान करतो जी तुमच्या रोगप्रतिकारक शक्तीला काम पूर्ण करण्यास अनुमती देते.', en: "Homeopathy works by stimulating your body's inherent energy. We provide the spark that allows your immune system to finish the job." },
  'philosophy.restoration': { mr: 'दडपण्यावर पुनर्संचयित', en: 'Restoration over Suppression' },
  'philosophy.restorationDesc': { mr: 'पारंपारिक औषधे अनेकदा रोग खोलवर ढकलतात. आमचे उपचार शरीराला नैसर्गिकरित्या विषारी पदार्थ व्यक्त करण्यास आणि सोडण्यास प्रोत्साहित करतात.', en: 'Conventional medicines often push disease deeper. Our remedies encourage the body to express and release toxins naturally.' },
  'philosophy.individualized': { mr: 'वैयक्तिक उपचार', en: 'Individualized Healing' },
  'philosophy.individualizedDesc': { mr: 'तुमची कथा अद्वितीय आहे. तुमचे औषध देखील असावे. आम्ही तुमच्या विशिष्ट शारीरिक आणि भावनिक ब्लूप्रिंटवर आधारित लिहून देतो.', en: 'Your story is unique. Your medicine should be too. We prescribe based on your specific physical and emotional blueprint.' },
  
  // Timeline
  'timeline.title': { mr: 'आमचा प्रवास', en: 'Our Journey' },
  'timeline.subtitle': { mr: 'दोन दशकांहून अधिक काळ हजारो जीवन बदलणे', en: 'Over two decades of transforming thousands of lives' },
  'timeline.foundation': { mr: 'पाया', en: 'The Foundation' },
  'timeline.firstStep': { mr: 'पहिले क्लिनिकल पाऊल', en: 'First Clinical Step' },
  'timeline.specialized': { mr: 'विशेष फोकस', en: 'Specialized Focus' },
  'timeline.chronicCare': { mr: 'जुनाट काळजी प्रभुत्व', en: 'Chronic Care Mastery' },
  'timeline.vision': { mr: 'अलसफा दृष्टी', en: 'Alsafa Vision' },
  'timeline.wellness': { mr: 'समग्र निरोगी केंद्र', en: 'Holistic Wellness Center' },
  'timeline.today': { mr: 'आज', en: 'Today' },
  'timeline.legacy': { mr: 'संवैधानिक वारसा', en: 'Constitutional Legacy' },
  'timeline.advanced': { mr: 'प्रगत पॅथॉलॉजी', en: 'Advanced Pathology' },
  
  // FAQ
  'faq.title': { mr: 'का होमिओपॅथी?', en: 'Why Homeopathy?' },
  'faq.subtitle': { mr: 'रुग्णांकडून सामान्य प्रश्न', en: 'Common questions from patients' },
  
  // Testimonials
  'testimonials.title': { mr: 'रुग्णांच्या प्रशंसापत्रे', en: 'Patient Testimonials' },
  'testimonials.subtitle': { mr: 'आमच्या रुग्णांच्या शब्दांत वास्तविक परिणाम', en: 'Real results in the words of our patients' },
  
  // Contact
  'contact.title': { mr: 'भेटीची वेळ बुक करा', en: 'Book an Appointment' },
  'contact.subtitle': { mr: 'आपल्या निरोगी प्रवासाची सुरुवात करा', en: 'Start your journey to wellness' },
  'contact.visitUs': { mr: 'आम्हाला भेट द्या', en: 'Visit Us' },
  'contact.clinicHours': { mr: 'क्लिनिक वेळा', en: 'Clinic Hours' },
  'contact.getDirections': { mr: 'दिशानिर्देश मिळवा', en: 'Get Directions' },
  
  // Footer
  'footer.tagline': { mr: 'नैसर्गिक उपचार, चिरस्थायी परिणाम', en: 'Natural Healing, Lasting Results' },
  'footer.quickLinks': { mr: 'द्रुत दुवे', en: 'Quick Links' },
  'footer.contactInfo': { mr: 'संपर्क माहिती', en: 'Contact Info' },
  'footer.followUs': { mr: 'आम्हाला फॉलो करा', en: 'Follow Us' },
  'footer.rights': { mr: 'सर्व हक्क राखीव', en: 'All rights reserved' },
// About - Additional
  'about.holisticAnalysis': { mr: 'समग्र विश्लेषण', en: 'Holistic Analysis' },
  'about.holisticAnalysisDesc': { mr: 'तुमच्या आजारांचे मूळ ट्रिगर ओळखणे.', en: 'Identifying the root triggers of your ailments.' },
  'about.familyHealth': { mr: 'कौटुंबिक आरोग्य', en: 'Family Health' },
  'about.familyHealthDesc': { mr: 'मुले आणि ज्येष्ठ नागरिकांसाठी सुरक्षित उपचार.', en: 'Treatments safe for children and seniors alike.' },
  'about.certifiedCare': { mr: 'प्रमाणित काळजी', en: 'Certified Care' },
  'about.certifiedCareDesc': { mr: 'जटिल जुनाट पॅथॉलॉजीमध्ये तज्ञता.', en: 'Expertise in complex chronic pathology.' },
  'about.quote': { mr: 'उपचार हा एक प्रवास आहे जो आपण एकत्र करतो. आमचे ध्येय तुमच्या शरीराच्या जीवनशक्तीला नैसर्गिकरित्या संतुलन पुनर्संचयित करण्यासाठी सशक्त करणे आहे.', en: 'Healing is a journey we take together. Our goal is to empower your body\'s vital force to restore balance naturally.' },
  'about.learnMoreApproach': { mr: 'आमच्या दृष्टिकोनाबद्दल अधिक जाणून घ्या', en: 'Learn More About Our Approach' },
  
  // Philosophy
  'philosophy.myApproach': { mr: 'उपचारासाठी माझा दृष्टीकोन', en: 'My Approach to Healing' },
  'philosophy.quote1': { mr: 'माझे तत्त्वज्ञान सोपे आहे: मी रोगाच्या नावावर उपचार करत नाही; मी त्रस्त असलेल्या व्यक्तीवर उपचार करतो.', en: "My philosophy is simple: I don't treat the name of the disease; I treat the person who is suffering." },
  'philosophy.description': { mr: 'उपचार म्हणजे संतुलनाची पुनर्स्थापना. माझ्या सरावात, आम्ही तासनतास ऐकण्यात घालवतो—केवळ लक्षणेच नाही तर तुमची कथा. तुमचे अद्वितीय ट्रिगर समजून घेऊन, आम्ही तुमच्या जीवनशक्तीशी प्रतिध्वनी करणारा उपाय शोधतो.', en: 'Healing is the restoration of balance. In my practice, we spend hours listening—not just to symptoms, but to your story. By understanding your unique triggers, we find the remedy that resonates with your vital force.' },
  'philosophy.chiefConsultant': { mr: 'मुख्य सल्लागार', en: 'Chief Consultant' },
  
  // Timeline
  'timeline.journeyTitle': { mr: 'उपचाराचा प्रवास', en: 'A Journey of Healing' },
  'timeline.journeyDesc': { mr: '२० वर्षांहून अधिक क्लिनिकल सराव सतत वाढ आणि हजारो बरे झालेल्या रुग्णांची कथा सांगत आहे.', en: 'Over 20 years of clinical practice narrating a story of persistent growth and thousands of recovered patients.' },
  'timeline.experience': { mr: 'अनुभव', en: 'Experience' },
  'timeline.years': { mr: '२०+ वर्षे', en: '20+ Years' },
  'timeline.impact': { mr: 'प्रभाव', en: 'Impact' },
  'timeline.lives': { mr: '३०k+ जीवन', en: '30k+ Lives' },
  'timeline.showing': { mr: 'दाखवत आहे', en: 'Showing' },
  'timeline.of': { mr: 'च्या', en: 'of' },
  'timeline.flowingJourney': { mr: 'प्रवाही प्रवास • थांबण्यासाठी होव्हर करा', en: 'Flowing journey • Hover to pause' },
  'timeline.livesTouched': { mr: 'स्पर्श केलेले जीवन', en: 'Lives Touched' },
  
  // FAQ/Why Homeopathy - Additional
  'faq.interactiveGuide': { mr: 'परस्पर मार्गदर्शक', en: 'Interactive Guide' },
  'faq.whyChoose': { mr: 'होमिओपॅथी का निवडावी?', en: 'Why Choose Homeopathy?' },
  'faq.selectInquiry': { mr: 'चौकशी निवडा', en: 'Select an Inquiry' },
  'faq.clinicalAnswer': { mr: 'क्लिनिकल उत्तर', en: 'The Clinical Answer' },
  'faq.safePath': { mr: 'सुरक्षित आणि प्रभावी मार्ग', en: 'Safe & Effective Path' },
  'faq.methodology': { mr: 'अलसफा पद्धत', en: 'Alsafa Methodology' },
  'faq.patientPerspectives': { mr: 'रुग्ण दृष्टीकोन', en: 'patient perspectives' },
  'faq.consultationRequired': { mr: 'वैयक्तिक उपचार योजनांसाठी सल्लामसलत आवश्यक', en: 'Consultation required for personalized treatment plans' },
  
  // Testimonials - Additional
  'testimonials.healingStories': { mr: 'उपचार कथा', en: 'Healing Stories' },
  'testimonials.realExperiences': { mr: 'आमच्या सौम्य होमिओपॅथिक दृष्टिकोनाद्वारे आराम मिळालेल्या रुग्णांचे वास्तविक अनुभव.', en: 'Real experiences from patients who found relief through our gentle homeopathic approach.' },
  
  // Common
  'common.loading': { mr: 'लोड होत आहे...', en: 'Loading...' },
// Contact/Location
  'contact.getInTouch': { mr: 'संपर्कात रहा', en: 'Get in Touch' },
  'contact.helpJourney': { mr: 'आम्ही तुमच्या उपचार प्रवासात तुम्हाला मदत करण्यासाठी येथे आहोत. जलदतम प्रतिसादासाठी फोन किंवा व्हाट्सअॅपद्वारे थेट तुमची भेट बुक करा.', en: 'We are here to help you on your healing journey. Book your appointment directly via Phone or WhatsApp for the fastest response.' },
  'contact.visitUsCard': { mr: 'आम्हाला भेट द्या', en: 'Visit Us' },
  'contact.openInMaps': { mr: 'नकाशात उघडा', en: 'Open in Maps' },
  'contact.bookNow': { mr: 'आता बुक करा', en: 'Book Now' },
  'contact.fastestWay': { mr: 'स्लॉट मिळवण्याचा जलद मार्ग', en: 'Fastest way to get a slot' },
  'contact.callForAppointment': { mr: 'भेटीसाठी कॉल करा', en: 'Call for appointment' },
  'contact.inquiryWhatsApp': { mr: 'व्हाट्सअॅपवर चौकशी', en: 'Inquiry on WhatsApp' },
  'contact.doctorsOnline': { mr: 'डॉक्टर ऑनलाइन', en: 'Doctors Online' },
  'contact.clinicHoursCard': { mr: 'क्लिनिक वेळा', en: 'Clinic Hours' },
  'contact.closedSundays': { mr: 'रविवारी बंद', en: 'Closed on Sundays' },
  'contact.mon': { mr: 'सोम', en: 'Mon' },
  'contact.sat': { mr: 'शनि', en: 'Sat' },
  'contact.sundays': { mr: 'रविवार', en: 'Sundays' },
  'contact.morning': { mr: 'सकाळ', en: 'Morning' },
  'contact.evening': { mr: 'संध्याकाळ', en: 'Evening' },
  'contact.closed': { mr: 'बंद', en: 'Closed' },
  
  // Footer
  'footer.description': { mr: 'मूळ कारणावर उपचार करण्यावर लक्ष केंद्रित करणारी वैयक्तिक होमिओपॅथिक आरोग्यसेवा प्रदान करणे. २० वर्षांहून अधिक क्लिनिकल कौशल्यासह सौम्य उपचारांचा अनुभव घ्या.', en: 'Providing personalized homeopathic healthcare that focuses on treating the root cause. Experience gentle healing with over 20 years of clinical expertise.' },
  'footer.contactInfoSection': { mr: 'संपर्क माहिती', en: 'Contact Info' },
  'footer.phone': { mr: 'फोन', en: 'Phone' },
  'footer.whatsapp': { mr: 'व्हाट्सअॅप', en: 'WhatsApp' },
  'footer.quickAccess': { mr: 'द्रुत प्रवेश', en: 'Quick Access' },
  'footer.home': { mr: 'मुख्यपृष्ठ', en: 'Home' },
  'footer.doctors': { mr: 'डॉक्टर', en: 'Doctors' },
  'footer.journey': { mr: 'प्रवास', en: 'Journey' },
  'footer.services': { mr: 'सेवा', en: 'Services' },
  'footer.about': { mr: 'आमच्याबद्दल', en: 'About' },
  'footer.stories': { mr: 'कथा', en: 'Stories' },
  'footer.whyUs': { mr: 'आम्ही का', en: 'Why Us' },
  'footer.gallery': { mr: 'गॅलरी', en: 'Gallery' },
  'footer.contact': { mr: 'संपर्क', en: 'Contact' },
  'footer.disclaimer': { mr: 'वैद्यकीय अस्वीकरण: होमिओपॅथी वैयक्तिक संविधानावर कार्य करते. परिणाम आणि उपचार वेळ रुग्णापासून रुग्णापर्यंत बदलू शकतो. या वेबसाइटवरील माहिती केवळ शैक्षणिक हेतूंसाठी आहे आणि व्यावसायिक वैद्यकीय सल्ल्याचा पर्याय नाही.', en: 'Medical Disclaimer: Homeopathy works on individual constitution. Results and healing time may vary from patient to patient. Information on this website is for educational purposes only and not a substitute for professional medical advice.' },
  'footer.allRights': { mr: 'सर्व हक्क राखीव', en: 'All Rights Reserved' },
  'footer.designedBy': { mr: 'डिझाइन आणि विकसित', en: 'Designed & Developed by' },
  'common.error': { mr: 'त्रुटी', en: 'Error' },
  'common.success': { mr: 'यशस्वी', en: 'Success' },
  'common.readMore': { mr: 'अधिक वाचा', en: 'Read More' },
  'common.learnMore': { mr: 'अधिक जाणून घ्या', en: 'Learn More' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr'); // Default to Marathi

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'mr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'mr' ? 'en' : 'mr';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};