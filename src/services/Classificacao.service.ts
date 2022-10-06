import { AppError } from '../errors/AppError.class';
import { Classificacao } from '../models/Classificacao.model';
import { ClassificacaoRepository } from '../repositories/Classificacao.repository';

class ClassificacaoService {
  private classificacao: ClassificacaoRepository;
  constructor() {
    this.classificacao = new ClassificacaoRepository();
  }

  async create(args: Classificacao): Promise<Classificacao> {
    if (!args.desc_classificacao) {
      throw new AppError('Informe uma Classificação');
    }

    const classificacao = await this.classificacao.loadClassificacao(
      args.desc_classificacao,
    );
    if (classificacao) {
      throw new AppError(
        'Já existe uma Classificação registrada com essas informações',
      );
    }

    return this.classificacao.create({
      desc_classificacao: args.desc_classificacao,
    });
  }

  async delete(id_classificacao: number): Promise<void> {
    if (!id_classificacao) {
      throw new AppError('Informe o Identificador da Classificação');
    }

    const classificacao = await this.classificacao.loadId(id_classificacao);
    if (!classificacao) {
      throw new AppError(
        'Não foram localizadas Classificações com o identificador informado',
        404,
      );
    }

    return this.classificacao.delete(classificacao.id_classificacao);
  }

  async read(args: any): Promise<any> {
    return this.classificacao.read(args);
  }

  async update(args: Classificacao): Promise<void> {
    if (!args.id_classificacao) {
      throw new AppError('Informe o Identificador da Classificação');
    }

    const classificacao = await this.classificacao.loadId(
      args.id_classificacao,
    );
    if (!classificacao) {
      throw new AppError(
        'Não foram localizadas Classificações com o identificador informado',
        404,
      );
    }

    if (args.desc_classificacao) {
      classificacao.desc_classificacao = args.desc_classificacao;
    }

    await this.classificacao.update(classificacao);
  }
}

export { ClassificacaoService };