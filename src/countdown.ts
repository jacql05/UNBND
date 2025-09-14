export class CountdownTimer {
  private targetDate: Date;
  private intervalId: number | null = null;

  constructor(targetDate: Date) {
    this.targetDate = targetDate;
    this.init();
  }

  private init(): void {
    this.updateDisplay();
    this.startTimer();
  }

  private updateDisplay(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.displayZeros();
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.setElementText('days', days.toString().padStart(2, '0'));
    this.setElementText('hours', hours.toString().padStart(2, '0'));
    this.setElementText('minutes', minutes.toString().padStart(2, '0'));
    this.setElementText('seconds', seconds.toString().padStart(2, '0'));
  }

  private setElementText(id: string, value: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  private displayZeros(): void {
    this.setElementText('days', '00');
    this.setElementText('hours', '00');
    this.setElementText('minutes', '00');
    this.setElementText('seconds', '00');
  }

  private startTimer(): void {
    this.intervalId = window.setInterval(() => {
      this.updateDisplay();
    }, 1000);
  }

  public destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public setNewTarget(targetDate: Date): void {
    this.targetDate = targetDate;
    this.updateDisplay();
  }
}
