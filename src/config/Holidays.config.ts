import { response } from 'express';
import moment from 'moment-business-days';

import { prisma } from './Prisma.config';

export async function calculateDays(date: any, days: number) {
  const anoVigente = Number(moment(new Date()).format('YYYY'));
  const mesVigente = Number(moment(new Date()).format('MM'));

  try {
    const datas_especiais = [];
    const feriados = await prisma.feriados.findMany({
      select: {
        data_feriado: true,
      },
      where: {
        AND: {
          mes_feriado: {
            equals: mesVigente,
          },
          ano_feriado: {
            equals: anoVigente,
          },
        },
      },
    });

    feriados.forEach(feriado => {
      datas_especiais.push(feriado.data_feriado);
    });

    moment.updateLocale('pt-BR', {
      holidays: datas_especiais,
      holidayFormat: 'YYYY-MM-DD',
      workingWeekdays: [1, 2, 3, 4, 5],
    });
    return moment(date, 'YYYY-MM-DD').businessAdd(days);
  } catch (e) {
    return response.status(500).send();
  }
}
