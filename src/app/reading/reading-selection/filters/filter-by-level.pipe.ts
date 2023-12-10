import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByLevel'
})
export class FilterByLevelPipe implements PipeTransform {

  transform(readings: any[], level: string): any[] {
    if (!readings) {
      return [];
    }
    if (!level || level === 'all') {
      return readings;
    }
    return readings.filter(reading => reading.level === level);
  }

}
