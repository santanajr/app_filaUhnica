export class Fila
{
  key: String;
  keyEstabelecimento: String;
  NomeEstabelecimento: String;
  DataAtendimento: string;
  StatusFila: string;
}

export class Atendimento
{
  key: string;
  keyfila: string;
  NomeSolicitante: string;
  Descricao: string;
  Celular: string;
  CodigoEspera: string;
  TempoAguardo: string;
  PrevisaoAtendimento: string;
  Ativo: string;
  DataAtendimento: string;
  AtendimentoAtual: string;
}

