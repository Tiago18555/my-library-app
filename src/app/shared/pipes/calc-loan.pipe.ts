import { Pipe, PipeTransform } from '@angular/core';
import { BorrowingResponseDataModel } from '../../models/response-models/borrowing';


@Pipe({
  name: 'calcLoan',
  pure: false
})
export class CalcLoanPipe implements PipeTransform {

  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(Number(endDate) - Number(startDate)) / msInDay;
  }

  transform(value: BorrowingResponseDataModel): string {
    let { endsAt, deadLine } = value;
    let { assessment } = value.configuration;

    let diff = this.getDayDiff(
      new Date(deadLine),
      new Date(endsAt || new Date().toLocaleDateString('en-us'))
    )

    let result = (diff * assessment).toFixed(2)

    if(diff <= 0) {
      return 'isento'
    } else {
      return String('R$ ' + String(result))
    } 
  }
}
