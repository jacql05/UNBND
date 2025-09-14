export class ReviewsRotator {
  private currentIndex = 0;
  private reviews: NodeListOf<HTMLElement>;
  private indicators: NodeListOf<HTMLElement>;
  private intervalId: number | null = null;

  constructor() {
    this.reviews = document.querySelectorAll('.review');
    this.indicators = document.querySelectorAll('.indicator');
    this.init();
  }

  private init(): void {
    this.setupIndicators();
    this.startRotation();
  }

  private setupIndicators(): void {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToReview(index);
      });
    });
  }

  private goToReview(index: number): void {
    if (index < 0 || index >= this.reviews.length) return;

    // Remove active class from current review and indicator
    this.reviews[this.currentIndex]?.classList.remove('active');
    this.indicators[this.currentIndex]?.classList.remove('active');

    // Set new index and add active class
    this.currentIndex = index;
    this.reviews[this.currentIndex]?.classList.add('active');
    this.indicators[this.currentIndex]?.classList.add('active');

    // Restart rotation timer
    this.restartRotation();
  }

  private nextReview(): void {
    const nextIndex = (this.currentIndex + 1) % this.reviews.length;
    this.goToReview(nextIndex);
  }

  private startRotation(): void {
    this.intervalId = window.setInterval(() => {
      this.nextReview();
    }, 5000); // Rotate every 5 seconds
  }

  private restartRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.startRotation();
  }

  public destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
