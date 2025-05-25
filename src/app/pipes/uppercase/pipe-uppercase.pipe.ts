import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeUppercase'
})
export class PipeUppercasePipe implements PipeTransform {

  transform(value: string): string {
    if (value === undefined || value === null) {
      return ''; 
    }
    return value.toUpperCase();
  }
}
