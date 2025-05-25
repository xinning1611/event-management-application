import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class PipeDurationFormatPipe implements PipeTransform {

  transform(minutes: number): string {
    if (!minutes) {
      return '';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour(s) ${remainingMinutes} minute(s)`;
  }

}
