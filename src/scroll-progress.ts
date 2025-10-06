export class ScrollProgress {
  private progressBar: HTMLElement | null;

  constructor() {
    this.progressBar = document.getElementById('scroll-progress');
    this.init();
  }

  private init(): void {
    if (!this.progressBar) return;

    window.addEventListener('scroll', this.updateProgress.bind(this));
    window.addEventListener('resize', this.updateProgress.bind(this));
  }

  private updateProgress(): void {
    if (!this.progressBar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / documentHeight) * 100;

    this.progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  public destroy(): void {
    window.removeEventListener('scroll', this.updateProgress.bind(this));
    window.removeEventListener('resize', this.updateProgress.bind(this));
  }
}
