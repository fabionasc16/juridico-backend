import { Request, Response } from 'express';

import { AuthService } from '../services/Auth.service';
import { ProcessosService } from '../services/Processos.service';

import { LogsService } from '../services/Logs.service';

class ProcessosController {
  static service: ProcessosService;
  static logs: LogsService
  public constructor() {
    ProcessosController.service = new ProcessosService();
    ProcessosController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      numProcedimento,
      idTipoProcesso,
      prazoTotal,
      idOrgaoDemandante,
      dataProcesso,
      dataRecebimento,
      horaRecebimento,
      idAssunto,
      idClassificacao,
      objetoProcesso,
      requerSIGED,
      numProcessoSIGED,
      dataProcessoSIGED,
      permanenciaSIGED,
      caixaAtualSIGED,
      tramitacaoSIGED,
      idResponsavel,
      observacao,
      descricaoProcesso,
      diasCorridos,
      statusPrazo,
      sigiloso,
      statusProcesso,
      valorMulta,
    } = request.body;
    const service = await ProcessosController.service.create({
      num_procedimento: numProcedimento,
      fk_tipoprocesso: idTipoProcesso,
      prazo_total: Number(prazoTotal),
      fk_orgaodemandante: idOrgaoDemandante,
      data_processo: dataProcesso,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      fk_assunto: idAssunto,
      fk_classificacao: idClassificacao,
      objeto: objetoProcesso,
      requer_siged: requerSIGED === true ? 'S' : 'N',
      numero_siged: numProcessoSIGED,
      data_processo_siged: dataProcessoSIGED,
      permanencia_siged: permanenciaSIGED,
      caixa_atual_siged: caixaAtualSIGED,
      tramitacao_siged: tramitacaoSIGED,
      fk_responsavel: idResponsavel === '' ? null : idResponsavel,
      observacao,
      descricao: descricaoProcesso,
      status_prazo: statusPrazo,
      dias_corridos: diasCorridos === true ? 'S' : 'N',
      sigiloso: sigiloso === true ? 'S' : 'N',
      fk_status: statusProcesso,
      valor_multa: valorMulta === '' ? 0 : Number(valorMulta),
    });

     // Atualiza prazo do processo
     await ProcessosController.service.atualizaPrazoProcesso(service.id_processo);

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.CADASTRAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }
    return response.status(201).send(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_processo } = request.params;
    await ProcessosController.service.delete(Number(id_processo));

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.EXCLUIR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ProcessosController.service.read(request);

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_processo } = request.params;
    const data = await ProcessosController.service.readById(
      Number(id_processo),
    );

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async readByObjeto(request: Request, response: Response): Promise<Response> {
    const { objetoProcesso } = request.body;
    const data = await ProcessosController.service.readByObjeto(objetoProcesso);

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_processo } = request.params;
    const {
      numProcedimento,
      idTipoProcesso,
      prazoTotal,
      idOrgaoDemandante,
      dataProcesso,
      dataRecebimento,
      horaRecebimento,
      idAssunto,
      idClassificacao,
      objetoProcesso,
      requerSIGED,
      numProcessoSIGED,
      dataProcessoSIGED,
      permanenciaSIGED,
      caixaAtualSIGED,
      tramitacaoSIGED,
      idResponsavel,
      observacao,
      descricaoProcesso,
      statusPrazo,
      sigiloso,
      diasCorridos,
      statusProcesso,
      valorMulta,
    } = request.body;
   const service =  await ProcessosController.service.update({
      id_processo: Number(id_processo),
      num_procedimento: numProcedimento,
      fk_tipoprocesso: idTipoProcesso,
      prazo_total: Number(prazoTotal),
      fk_orgaodemandante: idOrgaoDemandante,
      data_processo: dataProcesso,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      fk_assunto: idAssunto,
      fk_classificacao: idClassificacao,
      objeto: objetoProcesso,
      requer_siged: requerSIGED === true ? 'S' : 'N',
      numero_siged: numProcessoSIGED,
      data_processo_siged: dataProcessoSIGED,
      permanencia_siged: permanenciaSIGED,
      caixa_atual_siged: caixaAtualSIGED,
      tramitacao_siged: tramitacaoSIGED,
      fk_responsavel: idResponsavel,
      observacao,
      descricao: descricaoProcesso,
      status_prazo: statusPrazo,
      dias_corridos: diasCorridos === true ? 'S' : 'N',
      sigiloso: sigiloso === true ? 'S' : 'N',
      fk_status: statusProcesso,
      valor_multa: valorMulta === '' ? 0 : Number(valorMulta),
    });

    // Atualiza prazo do processo
    await ProcessosController.service.atualizaPrazoProcesso(service.id_processo);

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.EDITAR, "Anônimo", "Indefinida", request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async retrieveSIGEDData(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numero_processo } = request.query;
    const data = await ProcessosController.service.retrieveSIGEDData(
      numero_processo as string,
    );

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.BUSCAR_PROCESSO, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(200).json(data);
  }

  async retrieveMovimentacoesProcesso(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numero_processo } = request.query;
    const data =
      await ProcessosController.service.retrieveMovimentacoesProcesso(
        numero_processo as string,
      );

      try {
        ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.MOVIMENTACOES_PROCESSO, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);
  
      } catch (error) {
        console.error('ERROR AO GRAVAR O LOG', error);
      }

    return response.status(200).json(data);
  }

  async readCaixasSIGED(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    const data = await ProcessosController.service.readCaixasSIGEDProcesso();

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.CAIXAS_SIGED, _request.user.nome, _request.user.unidadeUsuario[0].unit_name, _request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async updateStatusProcesso(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idProcesso } = request.query;
    const { idStatusProcesso, dataArquivamento, idResponsavel } = request.body;

    await ProcessosController.service.updateStatusProcesso(
      Number(idProcesso),
      dataArquivamento,
      idStatusProcesso,
      idResponsavel,
    );

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.EDITAR_STATUS, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(204).send();
  }

  async readByDescricao(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { descricaoProcesso } = request.body;
    
    const data = await ProcessosController.service.readByDescricao(
      descricaoProcesso,
    );

    try {
      ProcessosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.PROCESSO, LogsService.TRANSACTION.BUSCAR_PROCESSO_DESCRICAO, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async calculaStatusPrazo(
    request: Request,
    response: Response,
  ): Promise<Response> {

    const {
      numProcedimento,
      idTipoProcesso,
      prazoTotal,
      idOrgaoDemandante,
      dataProcesso,
      dataRecebimento,
      horaRecebimento,
      idAssunto,
      idClassificacao,
      objeto,
      requerSIGED,
      numProcessoSIGED,
      dataProcessoSIGED,
      permanenciaSIGED,
      caixaAtualSIGED,
      tramitacaoSIGED,
      idResponsavel,
      observacao,
      descricao,
      diasCorridos,
      statusPrazo,
      sigiloso,
      statusProcesso,
      valorMulta,
    } = request.body;

   const  processo = {
      num_procedimento: numProcedimento,
      fk_tipoprocesso: idTipoProcesso,
      prazo_total: Number(prazoTotal),
      fk_orgaodemandante: idOrgaoDemandante,
      data_processo: dataProcesso,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      fk_assunto: idAssunto,
      fk_classificacao: idClassificacao,
      objeto,
      requer_siged: requerSIGED === true ? 'S' : 'N',
      numero_siged: numProcessoSIGED,
      data_processo_siged: dataProcessoSIGED,
      permanencia_siged: permanenciaSIGED,
      caixa_atual_siged: caixaAtualSIGED,
      tramitacao_siged: tramitacaoSIGED,
      fk_responsavel: idResponsavel === '' ? null : idResponsavel,
      observacao,
      descricao,
      status_prazo: statusPrazo,
      dias_corridos: diasCorridos === true ? 'S' : 'N',
      sigiloso: sigiloso === true ? 'S' : 'N',
      fk_status: statusProcesso,
      valor_multa: valorMulta === '' ? 0 : Number(valorMulta),
    }
    const data = await ProcessosController.service.calculaStatusPrazo(processo);
  
    return response.status(200).json(data);
  }

  async atualizaPrazosProcesso(
    request: Request,
    response: Response,
  ): Promise<Response> {

    if(request.headers.authorization && process.env.CRON_TOKEN  && request.headers.authorization === process.env.CRON_TOKEN ){
      ProcessosController.service.atualizaPrazosProcessos();
    }else{
      return response.status(401).send({error:401, message: "Token inválido!"});
    }
    
     
    return response.status(200).send();
  }
}

export { ProcessosController };
