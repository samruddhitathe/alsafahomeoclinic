# Components to Fix - Remove useLanguage

The following components need to have `useLanguage` removed and text reverted to English:

1. components/About.tsx
2. components/ContactLocation.tsx
3. components/ExperienceTimeline.tsx
4. components/Footer.tsx
5. components/Gallery.tsx
6. components/HealingStories.tsx
7. components/Philosophy.tsx
8. components/Testimonials.tsx
9. components/WhyHomeopathyAccordion.tsx

## Quick Fix Instructions:

For each file:
1. Remove: `import { useLanguage } from '../contexts/LanguageContext';`
2. Remove: `const { t } = useLanguage();`
3. Replace all `{t('key')}` with the original English text
4. Replace all `{t('key.subkey')}` with the original English text

## Google Translate will handle all translation automatically!

The Google Translate widget in the Header will automatically translate ALL text on the page, including:
- All static text
- All dynamic content from constants
- All buttons and UI elements

No manual translation needed!