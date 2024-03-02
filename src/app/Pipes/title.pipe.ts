import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'title',
  standalone: true
})
export class TitlePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === "CPU") {
      return "Processors"
    }
    return value
  }

}
