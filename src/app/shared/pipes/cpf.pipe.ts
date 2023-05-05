import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string|number): string {
    let input : string = value.toString().replace('.', '').replace('.', '').replace('-', '').replace('/', '');

    let arr : string[] = input.split('');

    return arr[0] + arr[1] + arr [2] + '.' +
            arr[3] + arr[4] + arr [5] + '.' +
             arr[6] + arr[7] + arr [8] + '-' +
              arr[9] + arr[10]
  }
}
