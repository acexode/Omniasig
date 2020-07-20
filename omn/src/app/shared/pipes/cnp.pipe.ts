import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnp',
})
export class CnpPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value) {
      if (value.length === 13) {
        const ff = value.slice(0, 4);
        const ef = value.slice(9, 13);
        return ff + '*****' + ef;
      }
    }
    return null;
  }
}
