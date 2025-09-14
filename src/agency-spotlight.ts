export class AgencySpotlight {
  private spotlightElement: HTMLElement | null;
  private hasBeenShown = false;
  private showDelay = 10000; // 10 seconds

  constructor() {
    this.spotlightElement = document.getElementById('agency-spotlight');
    this.init();
  }

  private init(): void {
    if (!this.spotlightElement) return;

    // Check if spotlight has been shown before
    const hasSeenSpotlight = localStorage.getItem('unbnd-spotlight-seen');
    if (hasSeenSpotlight) {
      return; // Don't show if already seen
    }

    this.setupCloseButton();
    this.scheduleShow();
  }

  private setupCloseButton(): void {
    const closeButton = document.getElementById('spotlight-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.hideSpotlight();
      });
    }
  }

  private scheduleShow(): void {
    setTimeout(() => {
      this.showSpotlight();
    }, this.showDelay);
  }

  private showSpotlight(): void {
    if (this.hasBeenShown || !this.spotlightElement) return;

    this.spotlightElement.style.display = 'block';
    this.hasBeenShown = true;

    // Smooth scroll to spotlight
    this.spotlightElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  private hideSpotlight(): void {
    if (!this.spotlightElement) return;

    this.spotlightElement.style.display = 'none';

    // Mark as seen so it doesn't show again
    localStorage.setItem('unbnd-spotlight-seen', 'true');
  }

  public forceShow(): void {
    // Method to manually show spotlight (for testing)
    this.showSpotlight();
  }

  public reset(): void {
    // Method to reset spotlight (for testing)
    localStorage.removeItem('unbnd-spotlight-seen');
    this.hasBeenShown = false;
    if (this.spotlightElement) {
      this.spotlightElement.style.display = 'none';
    }
  }
}
