export type Reiteracao = {
  id_reiteracao?: number;
  num_procedimento: string | null;
  numero_siged: string | null;
  data_processo: Date | null;
  prazo: number | null;
  fk_status: number;
  data_recebimento: Date | null;
  hora_recebimento: string | null;
  reiteracao: string | null;
  fk_processo: number;
};
