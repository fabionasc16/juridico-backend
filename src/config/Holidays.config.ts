import { response } from 'express';
import moment from 'moment-business-days';
import "moment/locale/pt-br";
import { prisma } from './Prisma.config';

export async function calculateDays(date: any, days: number) {
  moment.locale('pt-br');
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

    for (let index = 0; index < feriados.length; index++) {
      // Retirando o timezone e formatando para o padrão aceito pelo calculo
      const feriado = feriados[index].data_feriado;
      const feriadoSemTimezone = moment(feriado).toISOString(false);
      datas_especiais.push(feriadoSemTimezone.split('T')[0]);
    }

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
export async function calculaDias(date: any, days: number) {
  moment.locale('pt-br');
  const anoVigente = Number(moment(new Date()).format('YYYY'));
  const mesVigente = Number(moment(new Date()).format('MM'));

  try {
    const datas_especiais = [];
    const feriados = await prisma.feriados.findMany({
      select: {
        data_feriado: true,
      },
      where: {
        AND: [
          { mes_feriado: mesVigente },
          { ano_feriado: anoVigente }
        ]
      },
    });
    

    for (let index = 0; index < feriados.length; index++) {
      // Retirando o timezone e formatando para o padrão aceito pelo calculo
      const feriado = feriados[index].data_feriado;
      const feriadoSemTimezone = moment(feriado).toISOString(false);
      datas_especiais.push(feriadoSemTimezone.split('T')[0]);
    }

    moment.updateLocale('pt-br', {
      holidays: datas_especiais,
      holidayFormat: 'YYYY-MM-DD',
      workingWeekdays: [1, 2, 3, 4, 5],
    });
    return moment(date, 'YYYY-MM-DD').businessAdd(days);
  } catch (e) {
    return response.status(500).send();
  }
}
