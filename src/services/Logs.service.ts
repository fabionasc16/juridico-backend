import axios from 'axios';
import * as dotenv from 'dotenv';
import { Client } from '@elastic/elasticsearch';

type User = {
  id: number;
  email: string;
  first_name: string;
};

export class LogsService {
  private static client: Client;
  public static SYSTEM = 'SAPEJ';
  public static MODULE = {'PROCESSO':'PROCESSO',  'RESPONSAVEIS':'RESPONSÁVEIS','FERIADOS':'FERIADOS','ORGAOS':'ORGÃOS','TIPOS_PROCESSO':'TIPOS PROCESSO', 'USUARIOS':'USUÁRIOS','ASSUNTOS':'ASSUNTOS','CLASSIFICACAO':'CLASSIFICAÇÃO', 'REITERACAO':'REITERAÇÃO','STATUS':'STATUS', 'TIPO_EVENTO':'TIPO EVENTO'};
  public static TRANSACTION = {'CADASTRAR':'CADASTRAR', 'EDITAR':'EDITAR', 'EDITAR_STATUS':'EDITAR STATUS','LISTAR':'LISTAR','EXCLUIR':'EXCLUIR','TRAMITAR':'TRAMITAR','VISUALIZAR':'VISUALIZAR','BUSCAR_PROCESSO':'BUSCAR PROCESSO','BUSCAR_PROCESSO_DESCRICAO':'BUSCAR PROCESSO DESCRICAO','MOVIMENTACOES_PROCESSO':'MOVIMENTACOES PROCESSO','CAIXAS_SIGED':'CAIXAS SIGED'};


  constructor() {
    dotenv.config({
      path: './.env',
    });

    if( !LogsService.client){
      LogsService.client = new Client({
        node: `${process.env.ELASTIC_HOST}`,
        auth: {
          username: `${process.env.ELASTIC_USER}`,
          password: `${process.env.ELASTIC_PASSWORD}`
        },
        tls: {
          // might be required if it's a self-signed certificate
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
      // this.client.indices.create({ index: 'system_logs', 'ignore': 400})

      //console.log(await this.client.indices.getSettings());
      //await this.client.cluster.putSettings( query_create_index);
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
  public async sendLogPacient(system: string, module: string, transaction: string, user: string, unit: string, idPaciente:string,data: any) {
    try {
      const query_create_index = {
        'settings': {
          'index': 'system_logs',
          'number_of_replicas': '0'
        }
      }
      // this.client.indices.create({ index: 'system_logs', 'ignore': 400})

      //console.log(await this.client.indices.getSettings());
      //await this.client.cluster.putSettings( query_create_index);
      const result = await LogsService.client.index({
        index: 'system_logs',
        document: {
          transaction: transaction,
          module: module,
          user: user,
          unit: unit,
          data: data,
          date: new Date,
          system: system,
          idPaciente: idPaciente
        }
      })
    } catch (error) {
      console.error("ERRO AO ENVIAR LOG!");
    }
  }


}
