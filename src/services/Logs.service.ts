import axios from 'axios';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { Client } from 'es8';

type User = {
  id: number;
  email: string;
  first_name: string;
};

export class LogsService {
  private static client: Client;
  public static SYSTEM = 'SAPEJ';
  public static MODULE = { 'PROCESSO': 'PROCESSO', 'RESPONSAVEIS': 'RESPONSÁVEIS', 'FERIADOS': 'FERIADOS', 'ORGAOS': 'ORGÃOS', 'TIPOS_PROCESSO': 'TIPOS PROCESSO', 'USUARIOS': 'USUÁRIOS', 'ASSUNTOS': 'ASSUNTOS', 'CLASSIFICACAO': 'CLASSIFICAÇÃO', 'REITERACAO': 'REITERAÇÃO', 'STATUS': 'STATUS', 'TIPO_EVENTO': 'TIPO EVENTO' };
  public static TRANSACTION = { 'CADASTRAR': 'CADASTRAR', 'EDITAR': 'EDITAR', 'EDITAR_STATUS': 'EDITAR STATUS', 'LISTAR': 'LISTAR', 'EXCLUIR': 'EXCLUIR', 'TRAMITAR': 'TRAMITAR', 'VISUALIZAR': 'VISUALIZAR', 'BUSCAR_PROCESSO': 'BUSCAR PROCESSO', 'BUSCAR_PROCESSO_DESCRICAO': 'BUSCAR PROCESSO DESCRICAO', 'MOVIMENTACOES_PROCESSO': 'MOVIMENTACOES PROCESSO', 'CAIXAS_SIGED': 'CAIXAS SIGED' };


  constructor() {
    dotenv.config({
      path: './.env',
    });

    if (!LogsService.client) {
      LogsService.client = new Client({
        node: `${process.env.ELASTIC_HOST}`,
        auth: {
          username: `${process.env.ELASTIC_USER}`,
          password: `${process.env.ELASTIC_PASSWORD}`
        },
        tls: {

          rejectUnauthorized: false
        }
      });
    }




  }

  public async sendLog(system: string, module: string, transaction: string, user: string, unit: string, data: any) {
    try {
      const query_create_index = {
        'settings': {
          'index': 'system_logs',
          'number_of_replicas': '0'
        }
      }

      const result = await LogsService.client.index({
        index: 'system_logs',
        document: {
          transaction: transaction,
          module: module,
          user: user,
          unit: unit,
          data: data,
          date: new Date,
          system: system
        }
      })
    } catch (error) {
      console.error("ERRO AO ENVIAR LOG!");
    }
  }


  public async list(request: Request, response: Response): Promise<any> {
    try {
      const responseQueue = [];
      const allLogs = [];
      
      const result = await LogsService.client.search({
        index: 'system_logs', 
        scroll: '30s',
        sort : [{ 'date': 'desc'}],
        size: 500,
        _source: ['date','transaction','module','user'],
        query: {
          match: { system: LogsService.SYSTEM }
        }
      });

      responseQueue.push(result);

      while (responseQueue.length) {
        const body = responseQueue.shift();
    
        // collect the titles from this response
        body.hits.hits.forEach(function (hit) {
          const dateLog =  new Date(hit._source.date);
          allLogs.push({'date': `${dateLog.toLocaleString()}` ,'transaction': hit._source.transaction, 'module': hit._source.module, 'user': hit._source.user.nome})
        });
    
        // check to see if we have collected all of the quotes
        if (body.hits.total.value === allLogs.length) {
         // console.log('Every quote', allLogs)
          break
        }
    
        // get the next response if there are more quotes to fetch
        responseQueue.push(
          await LogsService.client.scroll({
            scroll_id: body._scroll_id,
            scroll: '30s'
            
          })
        );
      }

      return response.status(201).json(allLogs);
      // return await response.status(200).json(result.hits.hits);

    } catch (error) {
      console.error("ERRO AO LER O LOG!",error);
      return response.status(500).send();
    }


  }


}
