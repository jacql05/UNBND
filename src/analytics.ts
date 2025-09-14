export interface AnalyticsConfig {
  gtag?: string;
  facebook?: string;
  hotjar?: string;
}

export class Analytics {
  private config: AnalyticsConfig;

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.init();
  }

  private init(): void {
    this.setupGoogleAnalytics();
    this.setupFacebookPixel();
    this.setupHotjar();
  }

  private setupGoogleAnalytics(): void {
    if (!this.config.gtag) return;

    // Create gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gtag}`;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    const initScript = document.createElement('script');
    initScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.config.gtag}');
    `;
    document.head.appendChild(initScript);
  }

  private setupFacebookPixel(): void {
    if (!this.config.facebook) return;

    const fbScript = document.createElement('script');
    fbScript.textContent = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${this.config.facebook}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);

    // Add noscript tag for Facebook Pixel
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${this.config.facebook}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);
  }

  private setupHotjar(): void {
    if (!this.config.hotjar) return;

    const hjScript = document.createElement('script');
    hjScript.textContent = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${this.config.hotjar},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hjScript);
  }

  // Analytics event tracking methods
  public trackEvent(eventName: string, parameters?: Record<string, any>): void {
    // Google Analytics
    if (this.config.gtag && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }

    // Facebook Pixel
    if (this.config.facebook && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
    }

    // Development logging
    if (import.meta.env.DEV) {
      console.log('Analytics event tracked:', eventName, parameters);
    }
  }

  public trackPageView(page?: string): void {
    this.trackEvent('page_view', {
      page_location: page || window.location.href,
    });
  }

  public trackButtonClick(buttonName: string): void {
    this.trackEvent('button_click', { button_name: buttonName });
  }

  public trackLanguageChange(language: string): void {
    this.trackEvent('language_change', { language });
  }

  public trackContactMethod(method: string): void {
    this.trackEvent('contact_method_used', { method });
  }
}
