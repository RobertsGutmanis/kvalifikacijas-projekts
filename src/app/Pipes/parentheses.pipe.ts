import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'parentheses',
  standalone: true
})
export class ParenthesesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value.length > 0) {
      value = `(${value})`
      return value
    } else {
      return value
    }
  }

}
