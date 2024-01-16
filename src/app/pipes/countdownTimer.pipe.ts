import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownTimer'
})
export class CountdownTimerPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600000);
    const minutes = Math.floor((value % 3600000) / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
