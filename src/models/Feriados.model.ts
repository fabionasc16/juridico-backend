export type Feriados = {
  id_feriado?: number;
  data_feriado: Date;
  desc_feriado: string;
  dia_feriado?: number | null;
  mes_feriado?: number | null;
  ano_feriado?: number | null;
  tipo_feriado: string;
};
