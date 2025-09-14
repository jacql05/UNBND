export interface ContactConfig {
  whatsapp?: string;
  telegram?: string;
  wechat?: string;
  calendly?: string;
}

export class ContactFABs {
  private config: ContactConfig;
  private fabToggle: HTMLElement | null;
  private fabMenu: HTMLElement | null;
  private wechatModal: HTMLElement | null;
  private isMenuOpen = false;

  constructor(config: ContactConfig) {
    this.config = config;
    this.fabToggle = document.getElementById('fab-toggle');
    this.fabMenu = document.getElementById('fab-menu');
    this.wechatModal = document.getElementById('wechat-modal');
    this.init();
  }

  private init(): void {
    this.setupToggle();
    this.setupLinks();
    this.setupWeChatModal();
  }

  private setupToggle(): void {
    if (!this.fabToggle || !this.fabMenu) return;

    this.fabToggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !this.fabToggle?.contains(e.target as Node) &&
        !this.fabMenu?.contains(e.target as Node)
      ) {
        this.closeMenu();
      }
    });
  }

  private toggleMenu(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  private openMenu(): void {
    this.fabMenu?.classList.add('active');
    this.isMenuOpen = true;
  }

  private closeMenu(): void {
    this.fabMenu?.classList.remove('active');
    this.isMenuOpen = false;
  }

  private setupLinks(): void {
    // WhatsApp
    const whatsappLink = document.getElementById(
      'whatsapp-link'
    ) as HTMLAnchorElement;
    if (whatsappLink && this.config.whatsapp) {
      whatsappLink.href = `https://wa.me/${this.config.whatsapp}`;
    }

    // Telegram
    const telegramLink = document.getElementById(
      'telegram-link'
    ) as HTMLAnchorElement;
    if (telegramLink && this.config.telegram) {
      telegramLink.href = `https://t.me/${this.config.telegram}`;
    }

    // Calendly
    const calendlyLink = document.getElementById(
      'calendly-link'
    ) as HTMLAnchorElement;
    if (calendlyLink && this.config.calendly) {
      calendlyLink.href = this.config.calendly;
    }
  }

  private setupWeChatModal(): void {
    const wechatToggle = document.getElementById('wechat-toggle');
    const wechatClose = document.getElementById('wechat-close');

    if (wechatToggle && this.wechatModal) {
      wechatToggle.addEventListener('click', () => {
        this.openWeChatModal();
      });
    }

    if (wechatClose && this.wechatModal) {
      wechatClose.addEventListener('click', () => {
        this.closeWeChatModal();
      });
    }

    // Close modal when clicking outside
    if (this.wechatModal) {
      this.wechatModal.addEventListener('click', (e) => {
        if (e.target === this.wechatModal) {
          this.closeWeChatModal();
        }
      });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        this.wechatModal?.classList.contains('active')
      ) {
        this.closeWeChatModal();
      }
    });
  }

  private openWeChatModal(): void {
    this.wechatModal?.classList.add('active');
    this.closeMenu(); // Close FAB menu when opening modal
  }

  private closeWeChatModal(): void {
    this.wechatModal?.classList.remove('active');
  }
}
