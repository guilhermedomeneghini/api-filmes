export interface Filme{
    titulo: string;
    descricao: string;
    genero: string;
    anoLancamento: number;
    duracao: number;
    imagemUrl: string;
    classificacao?: number;
    idioma?: string;
}