import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numVal'
})
export class NumValPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return value < 10 ? '0' + value : value.toString();
  }

}
