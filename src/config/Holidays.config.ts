// import { updateLocale } from 'moment-business-days';
//
// export const holidayParameters = updateLocale('pt-br', {
//   holidays: ['2022-01-01', '2022-02-12'],
//   holidayFormat: 'YYYY-MM-DD',
//   workingWeekdays: [1, 2, 3, 4, 5],
// });

import moment from 'moment';

const feriados = [
  '2022-09-23',
  '2022-09-26',
  '2022-09-27',
  '2022-09-28',
  '2022-09-29',
];

export function calculateDays(date: any, days: number) {
  date = moment(date);
  while (days > 0) {
    date = date.add(1, 'd');
    if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      days -= 1;
    }
    if (feriados.includes(date.format('YYYY-MM-DD'))) {
      days -= 1;
    }
  }

  return date;
}
