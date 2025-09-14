import './styles.css';
import { I18n, translations } from './i18n';
import { ReviewsRotator } from './reviews-rotator';
import { CountdownTimer } from './countdown';
import { ScrollProgress } from './scroll-progress';
import { ContactFABs, type ContactConfig } from './contact-fabs';
import { AgencySpotlight } from './agency-spotlight';
import { Analytics, type AnalyticsConfig } from './analytics';

// Environment configuration
const config = {
  contact: {
    whatsapp: import.meta.env.VITE_WHATSAPP || '1234567890',
    telegram: import.meta.env.VITE_TELEGRAM || 'unbnd_official',
    wechat: import.meta.env.VITE_WECHAT || 'unbnd_wechat',
    calendly: import.meta.env.VITE_CALENDLY || 'https://calendly.com/unbnd',
  } as ContactConfig,
  analytics: {
    gtag: import.meta.env.VITE_GTAG,
    facebook: import.meta.env.VITE_FACEBOOK_PIXEL,
    hotjar: import.meta.env.VITE_HOTJAR,
  } as AnalyticsConfig,
};

class UnbndApp {
  private i18n!: I18n;
  private reviewsRotator!: ReviewsRotator;
  private countdownTimer!: CountdownTimer;
  private scrollProgress!: ScrollProgress;
  private contactFABs!: ContactFABs;
  private agencySpotlight!: AgencySpotlight;
  private analytics!: Analytics;

  constructor() {
    this.init();
  }

  private init(): void {
    // Initialize i18n
    this.i18n = new I18n(translations);
    this.setupLanguageSwitching();

    // Initialize analytics
    this.analytics = new Analytics(config.analytics);

    // Initialize components
    this.reviewsRotator = new ReviewsRotator();
    this.scrollProgress = new ScrollProgress();
    this.contactFABs = new ContactFABs(config.contact);
    this.agencySpotlight = new AgencySpotlight();

    // Initialize countdown (set to a date 30 days from now as example)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    this.countdownTimer = new CountdownTimer(futureDate);

    // Setup event listeners
    this.setupEventListeners();

    // Initial translation update
    this.i18n.updatePage();

    // Track initial page view
    this.analytics.trackPageView();
  }

  private setupLanguageSwitching(): void {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const lang = target.getAttribute('data-lang');
        if (lang) {
          this.i18n.setLanguage(lang);
          this.analytics.trackLanguageChange(lang);
        }
      });
    });
  }

  private setupEventListeners(): void {
    // Hero CTA button
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) {
      heroCta.addEventListener('click', () => {
        this.analytics.trackButtonClick('hero_cta');
        // Scroll to contact section or trigger contact
        this.scrollToContact();
      });
    }

    // Contact FAB tracking
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) {
      whatsappLink.addEventListener('click', () => {
        this.analytics.trackContactMethod('whatsapp');
      });
    }

    const telegramLink = document.getElementById('telegram-link');
    if (telegramLink) {
      telegramLink.addEventListener('click', () => {
        this.analytics.trackContactMethod('telegram');
      });
    }

    const wechatToggle = document.getElementById('wechat-toggle');
    if (wechatToggle) {
      wechatToggle.addEventListener('click', () => {
        this.analytics.trackContactMethod('wechat');
      });
    }

    const calendlyLink = document.getElementById('calendly-link');
    if (calendlyLink) {
      calendlyLink.addEventListener('click', () => {
        this.analytics.trackContactMethod('calendly');
      });
    }

    // Service card tracking
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const serviceNames = ['web', 'mobile', 'consulting'];
        this.analytics.trackEvent('service_card_click', {
          service: serviceNames[index] || `service_${index}`,
        });
      });
    });

    // Smooth scrolling for navigation
    this.setupSmoothScrolling();
  }

  private setupSmoothScrolling(): void {
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = targetId
          ? document.getElementById(targetId)
          : null;

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  private scrollToContact(): void {
    const contactSection = document.getElementById('contact-fabs');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  // Public methods for debugging/testing
  public getI18n(): I18n {
    return this.i18n;
  }

  public getAnalytics(): Analytics {
    return this.analytics;
  }

  public forceShowSpotlight(): void {
    this.agencySpotlight.forceShow();
  }

  public resetSpotlight(): void {
    this.agencySpotlight.reset();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new UnbndApp();

  // Make app available globally for debugging
  (window as any).unbndApp = app;
});

// Handle page visibility changes for analytics
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Track when user returns to the page
    if ((window as any).unbndApp) {
      (window as any).unbndApp.getAnalytics().trackEvent('page_visible');
    }
  }
});

// Handle before unload for analytics
window.addEventListener('beforeunload', () => {
  if ((window as any).unbndApp) {
    (window as any).unbndApp.getAnalytics().trackEvent('page_unload');
  }
});
