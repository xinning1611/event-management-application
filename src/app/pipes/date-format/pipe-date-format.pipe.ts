import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'pipeDateFormat'
})
export class PipeDateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    let formattedDate = (moment(value)).format('DD/MM/YYYY HH:mm:ss')
    return formattedDate;
  }

}
