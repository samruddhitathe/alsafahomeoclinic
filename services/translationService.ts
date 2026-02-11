// Translation Service using Google Translate API
// This service automatically translates text between English and Marathi

interface TranslationCache {
  [key: string]: string;
}

class TranslationService {
  private cache: TranslationCache = {};
  private apiKey: string = ''; // Will be set from environment or user input
  
  // Initialize with API key
  initialize(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Translate text using Google Translate API
  async translateText(text: string, targetLang: 'mr' | 'en'): Promise<string> {
    // Check cache first
    const cacheKey = `${text}_${targetLang}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    // If no API key, return original text
    if (!this.apiKey) {
      console.warn('Translation API key not set. Using original text.');
      return text;
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
            format: 'text'
          })
        }
      );

      if (!response.ok) {
        throw new Error('Translation API request failed');
      }

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      // Cache the translation
      this.cache[cacheKey] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  // Translate multiple texts at once (batch translation)
  async translateBatch(texts: string[], targetLang: 'mr' | 'en'): Promise<string[]> {
    if (!this.apiKey) {
      return texts;
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: texts,
            target: targetLang,
            format: 'text'
          })
        }
      );

      if (!response.ok) {
        throw new Error('Translation API request failed');
      }

      const data = await response.json();
      return data.data.translations.map((t: any) => t.translatedText);
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts;
    }
  }

  // Clear cache
  clearCache() {
    this.cache = {};
  }
}

export const translationService = new TranslationService();