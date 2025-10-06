export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [lang: string]: Translation;
}

export const translations: Translations = {
  en: {
    hero: {
      title: 'Unleash Your Potential',
      subtitle: 'Transform your business with our innovative solutions',
      cta: 'Get Started',
    },
    about: {
      title: 'About UNBND',
      description:
        'We help businesses unlock their true potential through cutting-edge technology and innovative strategies.',
    },
    services: {
      title: 'Our Services',
      web: {
        title: 'Web Development',
        description: 'Custom web solutions tailored to your needs',
      },
      mobile: {
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications',
      },
      consulting: {
        title: 'Consulting',
        description: 'Strategic technology consulting for your business',
      },
    },
    reviews: {
      title: 'What Our Clients Say',
      review1: {
        text: '"UNBND transformed our digital presence completely. Highly recommended!"',
        author: '- Sarah Johnson, CEO',
      },
      review2: {
        text: '"Professional, efficient, and innovative. Exactly what we needed."',
        author: '- Michael Chen, CTO',
      },
      review3: {
        text: '"Outstanding results and exceptional customer service."',
        author: '- Emma Williams, Founder',
      },
    },
    countdown: {
      title: 'Next Melbourne Event',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    spotlight: {
      title: 'Featured Agency Partnership',
      description:
        "We're excited to announce our new partnership with leading industry experts.",
      close: 'Close',
    },
    contact: {
      wechat: {
        title: 'Scan QR Code for WeChat',
        instruction: 'QR Code placeholder',
      },
    },
  },
  zh: {
    hero: {
      title: '释放您的潜力',
      subtitle: '通过我们的创新解决方案改变您的业务',
      cta: '开始使用',
    },
    about: {
      title: '关于 UNBND',
      description: '我们通过尖端技术和创新策略帮助企业释放真正的潜力。',
    },
    services: {
      title: '我们的服务',
      web: {
        title: '网站开发',
        description: '根据您的需求定制的网站解决方案',
      },
      mobile: {
        title: '移动应用',
        description: '原生和跨平台移动应用程序',
      },
      consulting: {
        title: '咨询服务',
        description: '为您的业务提供战略技术咨询',
      },
    },
    reviews: {
      title: '客户评价',
      review1: {
        text: '"UNBND 彻底改变了我们的数字化形象。强烈推荐！"',
        author: '- 莎拉·约翰逊，首席执行官',
      },
      review2: {
        text: '"专业、高效、创新。正是我们所需要的。"',
        author: '- 迈克尔·陈，首席技术官',
      },
      review3: {
        text: '"出色的结果和卓越的客户服务。"',
        author: '- 艾玛·威廉姆斯，创始人',
      },
    },
    countdown: {
      title: '下一个墨尔本活动',
      days: '天',
      hours: '小时',
      minutes: '分钟',
      seconds: '秒',
    },
    spotlight: {
      title: '特色代理合作伙伴',
      description: '我们很高兴宣布与行业领先专家的新合作伙伴关系。',
      close: '关闭',
    },
    contact: {
      wechat: {
        title: '扫描微信二维码',
        instruction: '二维码占位符',
      },
    },
  },
};

export class I18n {
  private currentLang = 'en';
  private translations: Translations;

  constructor(translations: Translations) {
    this.translations = translations;
    this.detectLanguage();
  }

  private detectLanguage(): void {
    const browserLang = navigator.language.split('-')[0];
    if (this.translations[browserLang]) {
      this.currentLang = browserLang;
    }

    const savedLang = localStorage.getItem('unbnd-lang');
    if (savedLang && this.translations[savedLang]) {
      this.currentLang = savedLang;
    }
  }

  setLanguage(lang: string): void {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('unbnd-lang', lang);
      this.updatePage();
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let current: any = this.translations[this.currentLang];

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof current === 'string' ? current : key;
  }

  updatePage(): void {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        element.textContent = this.translate(key);
      }
    });

    // Update document language attribute
    document.documentElement.setAttribute('lang', this.currentLang);

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      }
    });
  }
}
